using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.DietMode.Commands.AddDietMode;
public class AddDietModeCommandHandler : IRequestHandler<AddDietModeCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly IDietModeRepository _dietModeRepository;

    public AddDietModeCommandHandler(IUserRepository userRepository, IDietModeRepository dietModeRepository)
    {
        _userRepository = userRepository;
        _dietModeRepository = dietModeRepository;
    }

    public async Task<HttpResponseMessage> Handle(AddDietModeCommand request, CancellationToken cancellationToken)
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
            if (request.Name.Length == 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Name cannot be empty"),
                };
            }

            Domain.Entities.DietMode dietMode = new Domain.Entities.DietMode
            {
                Name = request.Name,
                Coeficient = request.Coeficient,
            };

            _dietModeRepository.Add(dietMode);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Diet mode was added successfully"),
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
