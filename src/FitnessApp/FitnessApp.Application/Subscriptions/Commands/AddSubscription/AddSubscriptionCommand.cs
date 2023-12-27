using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
namespace FitnessApp.Application.Subscriptions.Commands.AddSubscription;

public record AddSubscriptionCommand
(
    Guid ClientId,
    string CoachEmail,
    int Duration
) : IRequest<HttpResponseMessage>;
