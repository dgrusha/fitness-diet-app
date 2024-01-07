using System;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;
namespace FitnessApp.Application.Subscriptions.Commands.AddSubscription;

public class AddSubscriptionCommandHandler : IRequestHandler<AddSubscriptionCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly ICoachRepository _coachRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;

    public AddSubscriptionCommandHandler(IUserRepository userRepository, ICoachRepository coachRepository, ISubscriptionRepository subscriptionRepository)
    {
        _userRepository = userRepository;
        _coachRepository = coachRepository;
        _subscriptionRepository = subscriptionRepository;
    }

    public async Task<HttpResponseMessage> Handle(AddSubscriptionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserById(request.ClientId);
            var coach =  _coachRepository.GetByUserEmail(request.CoachEmail);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a client does not exist"),
                };
            }

            if (coach == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Premium subscribtion requieres coach to be selected"),
                };
            }

            if (request.Duration <= 0)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Duration of subscription should be positive"),
                };
            }



            Subscription subscription = new Subscription
            {
                ClientId = user.Id,
                CoachId = coach != null ? coach.Id : null,
                EndDate = DateTime.Today.AddMonths(request.Duration)
            };

            _subscriptionRepository.Add(subscription);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Subscription proccess ended with success"),
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
