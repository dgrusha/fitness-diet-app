using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.Queries;

public record RefreshConnectionQuery
(
    Guid Id,
    string Token
) : IRequest<UniqueResponse<AuthenticationResult>>;
