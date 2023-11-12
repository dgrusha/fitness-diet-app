using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.UserProfile.Commands.DeleteUnverifiedCoach;
public class DeleteUnverifiedCoachCommandHandler : IRequestHandler<DeleteUnverifiedCoachCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;

    public DeleteUnverifiedCoachCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(DeleteUnverifiedCoachCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var admin = _userRepository.GetUserById(request.UserId);

            if (admin == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist"),
                };
            }

            if (admin.IsAdmin == false)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist"),
                };
            }

            var userToDelete = _userRepository.GetUserByEmail(request.Email);

            if (userToDelete == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("No such a user exists."),
                };
            }

            if (userToDelete.Email.Equals(admin.Email))
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("You try to delete yourself."),
                };
            }

            _userRepository.Delete(userToDelete);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("User was deleted successfully."),
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
