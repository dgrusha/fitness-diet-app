using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.ActivityMode.Commands.AddActivityMode;
public class AddActivityModeCommandHandler : IRequestHandler<AddActivityModeCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly IActivityModeRepository _activityModeRepository;

    public AddActivityModeCommandHandler(IUserRepository userRepository, IActivityModeRepository activityModeRepository)
    {
        _userRepository = userRepository;
        _activityModeRepository = activityModeRepository;
    }

    public async Task<HttpResponseMessage> Handle(AddActivityModeCommand request, CancellationToken cancellationToken)
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
            if (request.Coeficient <= 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Coeficient cannot be negative"),
                };
            }

            Domain.Entities.ActivityMode activityMode = new Domain.Entities.ActivityMode
            {
                Name = request.Name,
                Coeficient = request.Coeficient,
            };

            _activityModeRepository.Add(activityMode);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Activity mode was added successfully"),
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
