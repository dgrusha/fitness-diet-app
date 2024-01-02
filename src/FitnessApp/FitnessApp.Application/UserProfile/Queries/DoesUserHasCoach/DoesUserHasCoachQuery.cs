using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.DoesUserHasCoach;
public record DoesUserHasCoachQuery
(
    Guid userId,
    Guid coachId
) : IRequest<bool>;
