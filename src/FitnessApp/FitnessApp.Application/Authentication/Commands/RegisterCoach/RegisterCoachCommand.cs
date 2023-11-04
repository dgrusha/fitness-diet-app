using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.Authentication.Commands.RegisterCoach;
public record RegisterCoachCommand
(
    string FirstName,
    string LastName,
    string Email,
    string Password, 
    string Text,
    string FileUrl
) : IRequest<UniqueResponse<AuthenticationResult>>;
