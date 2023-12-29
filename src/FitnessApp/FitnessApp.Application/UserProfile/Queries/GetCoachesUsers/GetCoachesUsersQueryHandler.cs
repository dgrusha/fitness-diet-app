using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetCoachesUsers;
public class GetCoachesUsersQueryHandler : IRequestHandler<GetCoachesUsersQuery, UniqueResponse<List<UserWithIdDto>>>
{
    private readonly IUserRepository _userRepository;

    public GetCoachesUsersQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<List<UserWithIdDto>>> Handle(GetCoachesUsersQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<List<UserWithIdDto>> ();

        try
        {
            if (_userRepository.GetUserById(request.Id) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (user.Coach == null)
            {
                response.Errors.Add("User is not a coach");
                response.ErrorCode = (int)HttpStatusCode.FailedDependency;
                return response;
            };

            List<UserWithIdDto> users = _userRepository.GetAllCoachesPrescribedUsers(user.Coach.Id);

            response.Data = users;
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
