using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;
namespace FitnessApp.Application.Subscriptions.Commands.DeleteSubscription;

public class DeleteSubcriptionCommandHandler : IRequestHandler<DeleteSubscriptionCommand, HttpResponseMessage>
{
    private readonly ISubscriptionRepository _subscriptionRepository;
    private readonly IUserRepository _userRepository;

    public DeleteSubcriptionCommandHandler(ISubscriptionRepository subscriptionRepository,IUserRepository userRepository)
    {
        _subscriptionRepository = subscriptionRepository;
        _userRepository = userRepository;
       
    }

    public async Task<HttpResponseMessage> Handle(DeleteSubscriptionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.ClientId == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist"),
                };
            }
            _subscriptionRepository.Delete(request.ClientId);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Subscription was canceled successfully."),
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
