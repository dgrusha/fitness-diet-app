using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.EmailHandler;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Authentication.Commands.ResetCode;
public class ResetCodeCommandHandler : IRequestHandler<ResetCodeCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly IResetPasswordHandlerRepository _resetPasswordHandlerRepository;
    private readonly IEmailSender _emailSender;

    public ResetCodeCommandHandler(IUserRepository userRepository, IResetPasswordHandlerRepository resetPasswordHandlerRepository, IEmailSender emailSender)
    {
        _userRepository = userRepository;
        _resetPasswordHandlerRepository = resetPasswordHandlerRepository;
        _emailSender = emailSender;
    }

    public async Task<HttpResponseMessage> Handle(ResetCodeCommand request, CancellationToken cancellationToken)
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

            Random rnd = new Random();
            int myRandomNo = rnd.Next(10000000, 99999999);

            PasswordResetHolder passwordResetHolder = new PasswordResetHolder
            {
                Code = myRandomNo,
                UserId = user.Id
            };

            string emailText = $"Your code for resetting password is: {myRandomNo}, it will be active for 60 minutes." +
                $"\nIf you are not trying to reset password - report this issue to us: eatrain@serwer2317506.home.pl";
            _resetPasswordHandlerRepository.AddNewResetCode(passwordResetHolder);
            await _emailSender.SendEmail(request.Email, "Password reset", emailText);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Reset code was sent to the user"),
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
