using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dumpify;
using FitnessApp.Application.Common.Interfaces.Authentication;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Authentication.Commands.RegisterCoach;
public class RegisterCoachCommandHandler : IRequestHandler<RegisterCoachCommand, AuthenticationResult>
{

    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepository _userRepository;
    private readonly ICoachRepository _coachRepository;

    public RegisterCoachCommandHandler(ICoachRepository coachRepository, IUserRepository userRepository, ITokenGenerator tokenGenerator)
    {
        _coachRepository = coachRepository;
        _userRepository = userRepository;
        _tokenGenerator = tokenGenerator;
    }

    public async Task<AuthenticationResult> Handle(RegisterCoachCommand command, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserByEmail(command.Email) is not null)
        {
            throw new Exception("User with this email already exists");
        };

        var user = new User
        {
            FirstName = command.FirstName,
            LastName = command.LastName,
            Email = command.Email,
            HasObligatoryForm = false,
            Password = PasswordHandler.HashPassword(command.Password)
        };

        var coach = new Coach
        {
            RecomendationText = command.Text,
            CVFileName = command.FileUrl,
            UserId = user.Id,
        };
        user.Coach = coach;

        _userRepository.Add(user);
        var token = _tokenGenerator.GenerateToken(user.Id, command.Email);

        return new AuthenticationResult(
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            false,
            token
        );
    }
}
