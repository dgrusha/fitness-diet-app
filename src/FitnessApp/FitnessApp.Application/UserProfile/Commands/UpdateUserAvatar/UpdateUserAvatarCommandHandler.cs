using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.UserProfile.Commands.UpdateUserAvatar;
public class UpdateUserAvatarCommandHandler : IRequestHandler<UpdateUserAvatarCommand, string>
{
    private readonly IUserRepository _userRepository;

    public UpdateUserAvatarCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<string> Handle(UpdateUserAvatarCommand request, CancellationToken cancellationToken)
    {
        var user = _userRepository.GetUserById(request.Id);
        if (user == null)
        {
            return "";
        }

        string theOldAvatar = user.AvatarFileName ?? string.Empty;

        _userRepository.UpdateUserAvatar(user, request.PhotoName);

        return theOldAvatar;
    }
}
