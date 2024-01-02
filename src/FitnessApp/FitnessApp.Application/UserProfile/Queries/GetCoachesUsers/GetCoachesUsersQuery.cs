using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetCoachesUsers;
public record GetCoachesUsersQuery
(
    Guid Id
) : IRequest<UniqueResponse<List<UserWithIdDto>>>;

