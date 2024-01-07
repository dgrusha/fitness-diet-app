using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.Authentication.Queries.VerifyResetCode;
public class VerifyResetCodeQueryHandler : IRequestHandler<VerifyResetCodeQuery, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly IResetPasswordHandlerRepository _resetPasswordHandlerRepository;

    public VerifyResetCodeQueryHandler(IResetPasswordHandlerRepository resetPasswordHandlerRepository, IUserRepository userRepository)
    {
        _resetPasswordHandlerRepository = resetPasswordHandlerRepository;
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(VerifyResetCodeQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserByEmail(request.Email);

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
                    Content = new StringContent("Code is not valid"),
                };
            }

            if (resetPasswordHolder.Code != number)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Code is not valid"),
                };
            }

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Code was successfully verified"),
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
