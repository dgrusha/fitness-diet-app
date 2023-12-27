using FitnessApp.Contracts.UniqueResponse;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.UserProfile.Queries.GetUserCoach;

public record GetUserCoachQuery
(
    Guid Id
) : IRequest<UniqueResponse<Common.DTO.CoachDto>>;
