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

namespace FitnessApp.Application.Commands.Register;
public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthenticationResult>
{

    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepository _userRepository;

    public RegisterCommandHandler(ITokenGenerator tokenGenerator, IUserRepository userRepository)
    {
        _tokenGenerator = tokenGenerator;
        _userRepository = userRepository;
    }

    public async Task<AuthenticationResult> Handle(RegisterCommand command, CancellationToken cancellationToken)
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
            Password = PasswordHandler.HashPassword(command.Password)
        };

        _userRepository.Add(user);
        user.Dump();
        var token = _tokenGenerator.GenerateToken(user.Id, command.Email);

        return new AuthenticationResult(
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            token
        );
    }
}
