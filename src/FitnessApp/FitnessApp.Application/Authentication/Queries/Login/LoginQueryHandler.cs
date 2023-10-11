using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Authentication;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Queries.Login;
public class LoginQueryHandler : IRequestHandler<LoginQuery, AuthenticationResult>
{

    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepository _userRepository;

    public LoginQueryHandler(ITokenGenerator tokenGenerator, IUserRepository userRepository)
    {
        _tokenGenerator = tokenGenerator;
        _userRepository = userRepository;
    }

    public async Task<AuthenticationResult> Handle(LoginQuery query, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserByEmail(query.Email) is not User user)
        {
            throw new Exception("User with this email does not exist");
        };

        if (!PasswordHandler.IsVerified(user.Password, query.Password))
        {
            throw new Exception("Invalid password");
        }

        var token = _tokenGenerator.GenerateToken(user.Id, user.Email);

        return new AuthenticationResult(
            Guid.NewGuid(),
            user.LastName,
            user.FirstName,
            user.Email,
            user.HasObligatoryForm,
            token
        );
    }
}
