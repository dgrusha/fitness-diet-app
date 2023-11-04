using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Dumpify;
using FitnessApp.Application.Common.Interfaces.Authentication;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Commands.Register;
public class RegisterCommandHandler : IRequestHandler<RegisterCommand, UniqueResponse<AuthenticationResult>>
{

    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepository _userRepository;

    public RegisterCommandHandler(ITokenGenerator tokenGenerator, IUserRepository userRepository)
    {
        _tokenGenerator = tokenGenerator;
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<AuthenticationResult>();

        try
        {
            if (command.Password != null && command.Password.Length < 3)
            {
                response.Errors.Add("Password is too small");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
            };

            if (command.FirstName != null && command.FirstName.Length < 3)
            {
                response.Errors.Add("First Name is too small");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
            };

            if (command.LastName != null && command.LastName.Length < 3)
            {
                response.Errors.Add("Last Name is too small");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
            };

            if (_userRepository.GetUserByEmail(command.Email) is not null)
            {
                response.Errors.Add("User with this email exists");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
            };

            if (response.Errors.Count > 0) 
            {
                return response;
            }

            var user = new User
            {
                FirstName = command.FirstName,
                LastName = command.LastName,
                Email = command.Email,
                HasObligatoryForm = false,
                Password = PasswordHandler.HashPassword(command.Password)
            };

            _userRepository.Add(user);
            user.Dump();
            var token = _tokenGenerator.GenerateToken(user.Id, command.Email);

            response.Data = new AuthenticationResult(
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                false,
                token
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
