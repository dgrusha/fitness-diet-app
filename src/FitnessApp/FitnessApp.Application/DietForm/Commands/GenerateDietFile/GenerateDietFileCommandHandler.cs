using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.DietForm.Commands.GenerateDietFile;
public class GenerateDietFileCommandHandler : IRequestHandler<GenerateDietFileCommand, HttpResponseMessage>
{
    private readonly IDietFormRepository _dietFormRepository;
    private readonly IUserRepository _userRepository;

    public GenerateDietFileCommandHandler(IDietFormRepository dietFormRepository, IUserRepository userRepository)
    {
        _dietFormRepository = dietFormRepository;
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(GenerateDietFileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserById(request.UserId);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist"),
                };
            }
            var dietFormToChange = _dietFormRepository.GetDietFormByUserId(user.Id);

            if (user.DietForm == null || dietFormToChange == null || user.ObligatoryForm == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("This user does not have diet/obligatory form"),
                };
            }

            if (user.DietForm.GenerateFile == true)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("File is already generating"),
                };
            }

            dietFormToChange.GenerateFile = true;
            _dietFormRepository.Update(dietFormToChange.Id, dietFormToChange);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Generating file was successfully requested"),
            };

        }
        catch (Exception ex)
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent($"An error occurred: {ex.Message}"),
            };
        }
    }
}
