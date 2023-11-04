using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.Queries;
public record LoginQuery
(
    string Email,
    string Password
): IRequest<UniqueResponse<AuthenticationResult>>;
