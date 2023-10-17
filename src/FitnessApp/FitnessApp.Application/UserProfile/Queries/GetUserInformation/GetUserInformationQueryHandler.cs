using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetUserInformation;
public class GetUserInformationQueryHandler : IRequestHandler<GetUserInformationQuery, GetUserProfileResult>
{

    private readonly IUserRepository _userRepository;

    public GetUserInformationQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetUserProfileResult> Handle(GetUserInformationQuery request, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserById(request.Id) is not User user)
        {
            throw new Exception("User with this id does not exist");
        };

        return new GetUserProfileResult(
            user.FirstName,
            user.LastName,
            user.Email,
            user.HasObligatoryForm,
            user.AvatarFileName
        );
    }
}