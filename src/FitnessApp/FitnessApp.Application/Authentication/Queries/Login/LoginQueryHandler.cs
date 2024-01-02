using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Authentication;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Queries.Login;
public class LoginQueryHandler : IRequestHandler<LoginQuery, UniqueResponse<AuthenticationResult>>
{

    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepository _userRepository;

    public LoginQueryHandler(ITokenGenerator tokenGenerator, IUserRepository userRepository)
    {
        _tokenGenerator = tokenGenerator;
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<AuthenticationResult>> Handle(LoginQuery query, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<AuthenticationResult>();

        try
        {
            if (_userRepository.GetUserByEmail(query.Email) is not User user)
            {
                response.Errors.Add("User with this email does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (!PasswordHandler.IsVerified(user.Password, query.Password))
            {
                response.Errors.Add("Invalid password");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            var token = _tokenGenerator.GenerateToken(user.Id, user.Email);

            response.Data = new AuthenticationResult(
                Guid.NewGuid(),
                user.LastName,
                user.FirstName,
                user.Email,
                user.IsAdmin,
                user.HasObligatoryForm,
                token,
                user.SubscriptionForCoach != null,
                user.Coach != null
            );

            response.ErrorCode = (int)HttpStatusCode.OK;
            return response;
        }
        catch (Exception ex)
        {
            response.Errors.Add(ex.Message);
            response.ErrorCode = (int)HttpStatusCode.InternalServerError;
        }

        return response;
    }
}
