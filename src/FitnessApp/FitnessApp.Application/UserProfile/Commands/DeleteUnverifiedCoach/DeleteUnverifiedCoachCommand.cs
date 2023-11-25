using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.UserProfile.Commands.DeleteUnverifiedCoach;
public record DeleteUnverifiedCoachCommand
(
   Guid UserId,
   string Email
) : IRequest<HttpResponseMessage>;