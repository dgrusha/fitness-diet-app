using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.UserProfile.Commands.UpdateUserInformation;
public class UpdateUserInformationCommandHandler : IRequestHandler<UpdateUserInformationCommand, HttpResponseMessage>
{

    private readonly IUserRepository _userRepository;

    public UpdateUserInformationCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(UpdateUserInformationCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserById(request.Id);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist"),
                };
            }

            if (user.FirstName.Length < 2 || user.FirstName.Length > 30) 
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Not correct range of first name parameter"),
                };
            }

            if (user.LastName.Length < 2 || user.LastName.Length > 30)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Not correct range of last name parameter"),
                };
            }

            _userRepository.UpdateUserInfo(user, request.FirstName, request.LastName);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("User was updated successfully"),
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
