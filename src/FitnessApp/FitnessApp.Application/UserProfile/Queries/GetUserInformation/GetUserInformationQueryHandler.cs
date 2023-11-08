using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetUserInformation;
public class GetUserInformationQueryHandler : IRequestHandler<GetUserInformationQuery, UniqueResponse<GetUserProfileResult>>
{

    private readonly IUserRepository _userRepository;

    public GetUserInformationQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<GetUserProfileResult>> Handle(GetUserInformationQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetUserProfileResult>();

        try
        {
            if (_userRepository.GetUserById(request.Id) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            response.Data = new GetUserProfileResult(
                user.FirstName,
                user.LastName,
                user.Email,
                user.HasObligatoryForm,
                user.AvatarFileName
            );
            response.ErrorCode = (int)HttpStatusCode.OK;
        }
        catch (Exception ex)
        {
            response.Errors.Add(ex.Message);
            response.ErrorCode = (int)HttpStatusCode.InternalServerError;
        }

        return response;
    }
}