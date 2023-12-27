using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Dumpify;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.UserProfile.Commands.UpdateCoachStatus;
public class UpdateCoachStatusCommandHandler : IRequestHandler<UpdateCoachStatusCommand, HttpResponseMessage>
{
    private readonly ICoachRepository _coachRepository;
    private readonly IUserRepository _userRepository;

    public UpdateCoachStatusCommandHandler(ICoachRepository coachRepository, IUserRepository userRepository)
    {
        _coachRepository = coachRepository;
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(UpdateCoachStatusCommand request, CancellationToken cancellationToken)
    {
        try
        {
            
            var user = _userRepository.GetUserById(request.UserId);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist."),
                };
            }

            if (user.IsAdmin == false)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("User is not authorized to do so."),
                };
            }

            Coach? coach = _coachRepository.GetByUserEmail(request.Email);

            if (coach == null) 
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("No such a user exists with a coach."),
                };
            }

            _coachRepository.UpdateVerified(coach, true);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("User was updated successfully"),
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
