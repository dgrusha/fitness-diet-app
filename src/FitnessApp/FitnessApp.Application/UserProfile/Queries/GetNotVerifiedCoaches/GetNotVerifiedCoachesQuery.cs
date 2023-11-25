using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetNotVerifiedCoaches;
public record GetNotVerifiedCoachesQuery
(
    Guid UserId
) : IRequest<string>;
