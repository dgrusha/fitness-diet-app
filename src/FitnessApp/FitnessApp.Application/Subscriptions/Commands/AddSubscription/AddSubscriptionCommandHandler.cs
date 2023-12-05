using System;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;
namespace FitnessApp.Application.Subscription.Commands.AddSubscription;

public class AddSubscriptionCommandHandler : IRequestHandler<AddSubscriptionCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;

    public AddSubscriptionCommandHandler(IUserRepository userRepository, ISubscriptionRepository subscriptionRepository)
    {
        _userRepository = userRepository;
        _subscriptionRepository = subscriptionRepository;
    }

    public async Task<HttpResponseMessage> Handle(AddSubscriptionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserById(request.ClientId);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a client does not exist"),
                };
            }

            var user = _userRepository.GetUserById(request.ClientId);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a client does not exist"),
                };
            }
            if (request.RatingLevel < 0 || request.RatingLevel > 5)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Rating cannot be lower than 0 or higher than 5"),
                };
            }
            if (request.Text.Length == 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Feedback cannot be empty"),
                };
            }

            Rating rating = new Rating
            {
                UserId = user.Id,
                RatingLevel = request.RatingLevel,
                Text = request.Text
            };

            _ratingRepository.Add(rating);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Feedback was added successfully"),
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
