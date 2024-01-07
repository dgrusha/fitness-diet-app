using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.TrainingForm.Commands.GenerateTrainingFile;
public class GenerateTrainingFileCommandHandler : IRequestHandler<GenerateTrainingFileCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly ITrainingFormRepository _trainingFormRepository;

    public GenerateTrainingFileCommandHandler(ITrainingFormRepository trainingFormRepository, IUserRepository userRepository)
    {
        _trainingFormRepository = trainingFormRepository;
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(GenerateTrainingFileCommand request, CancellationToken cancellationToken)
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
            var trainingFormToChange = _trainingFormRepository.GetTrainingFormByUserId(user.Id);

            if (user.TrainingForm == null || trainingFormToChange == null || user.ObligatoryForm == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("This user does not have diet/obligatory form"),
                };
            }

            if (user.TrainingForm.GenerateFile == true)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("File is already generating"),
                };
            }

            trainingFormToChange.GenerateFile = true;
            _trainingFormRepository.Update(trainingFormToChange.Id, trainingFormToChange);

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