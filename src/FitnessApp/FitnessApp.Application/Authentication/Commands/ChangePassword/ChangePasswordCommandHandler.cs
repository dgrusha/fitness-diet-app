using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Services.Authentication.Common;
using MediatR;

namespace FitnessApp.Application.Authentication.Commands.ChangePassword;
public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly IResetPasswordHandlerRepository _resetPasswordHandlerRepository;

    public ChangePasswordCommandHandler(IResetPasswordHandlerRepository resetPasswordHandlerRepository, IUserRepository userRepository)
    {
        _resetPasswordHandlerRepository = resetPasswordHandlerRepository;
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserByEmail(request.Email);

            if (
                    string.IsNullOrEmpty(request.Code) ||
                    string.IsNullOrEmpty(request.Password2) ||
                    string.IsNullOrEmpty(request.Password1) ||
                    string.IsNullOrEmpty(request.Email)
                ) 
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Some of the parameters are absent"),
                };
            }

            if (request.Password1 != request.Password2) 
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Provided passwords are not identical"),
                };
            }

            if (request.Password1.Length < 3)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Password is too small"),
                };
            }

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("User with such an email does not exist"),
                };
            }

            if (!string.IsNullOrEmpty(request.Code) && int.TryParse(request.Code, out int number))
            {
                if (number < 10000000 || number > 99999999)
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest)
                    {
                        Content = new StringContent("Code is not valid"),
                    };
                }
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Code is not valid"),
                };
            }

            var resetPasswordHolder = _resetPasswordHandlerRepository.GetActivePasswordResetHolderForUser(user.Id);

            if (resetPasswordHolder == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Code is not valid, generate a new one"),
                };
            }

            if (resetPasswordHolder.Code != number)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Code is not valid"),
                };
            }

            _userRepository.ChangeUserPassword(user.Id, PasswordHandler.HashPassword(request.Password1));

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Password is successfuly changed"),
            };
        }
        catch (Exception ex)
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent($"An error occurred: {ex.Message}"),
            };
        }
    }
}
