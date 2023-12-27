using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Subscriptions.Commands.UpdateCoachSubscription;

public record UpdateCoachSubscriptionCommand
(
   Guid ClientId,
   string Email
) : IRequest<HttpResponseMessage>;

