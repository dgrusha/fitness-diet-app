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

namespace FitnessApp.Application.UserProfile.Queries.GetUserStatuses;
public class GetUserStatusesQueryHandler : IRequestHandler<GetUserStatusesQuery, UniqueResponse<GetUserProfileStatuses>>
{
    private readonly IUserRepository _userRepository;

    public GetUserStatusesQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<GetUserProfileStatuses>> Handle(GetUserStatusesQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetUserProfileStatuses>();

        try
        {
            if (_userRepository.GetUserById(request.Id) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            response.Data = new GetUserProfileStatuses(
                user.DietStatus,
                user.TrainingStatus
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
