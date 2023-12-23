using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetUserStatuses;
public record GetUserStatusesQuery
(
    Guid Id
) : IRequest<UniqueResponse<GetUserProfileStatuses>>;
