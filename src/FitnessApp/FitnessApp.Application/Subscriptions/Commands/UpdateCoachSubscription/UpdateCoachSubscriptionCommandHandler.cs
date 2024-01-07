using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Dumpify;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Subscriptions.Commands.UpdateCoachSubscription;

public class UpdateCoachSubscriptionCommandHandler : IRequestHandler<UpdateCoachSubscriptionCommand, HttpResponseMessage>
{
    private readonly ICoachRepository _coachRepository;
    private readonly IUserRepository _userRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;

    public UpdateCoachSubscriptionCommandHandler(ICoachRepository coachRepository, IUserRepository userRepository, ISubscriptionRepository subscriptionRepository)
    {
        _coachRepository = coachRepository;
        _userRepository = userRepository;
        _subscriptionRepository = subscriptionRepository;
    }

    public async Task<HttpResponseMessage> Handle(UpdateCoachSubscriptionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserById(request.ClientId);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist."),
                };
            }

            Subscription? subscription = _subscriptionRepository.GetSubscriptionForCoach(user.Id);

            if (subscription == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Client doesn't have subscription for a coach."),
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

            _subscriptionRepository.UpdateCoach(subscription, coach.Id);      

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Coach was changed successfully"),
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
