using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.UserProfile.Commands.UpdateUserAvatar;
public record UpdateUserAvatarCommand
(
    Guid Id,
    string PhotoName
) : IRequest<string>;
