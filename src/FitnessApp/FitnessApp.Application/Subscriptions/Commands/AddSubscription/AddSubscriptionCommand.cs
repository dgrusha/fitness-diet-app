using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
namespace FitnessApp.Application.Subscription.Commands.AddSubscription;

public record AddSubscriptionCommand
(
    Guid ClientId,
    Guid CoachId,
    int SubscriptionType
) : IRequest<HttpResponseMessage>;
