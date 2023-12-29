using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace FitnessApp.Application.UserProfile.Queries.GetAllUsers;
public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, string>
{
    private readonly IUserRepository _userRepository;
    private readonly IDistributedCache _cache;

    public GetAllUserQueryHandler(IUserRepository userRepository, IDistributedCache cache)
    {
        _userRepository = userRepository;
        _cache = cache;
    }

    public async Task<string> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserById(request.Id) is not User user)
        {
            return await Task.FromResult("empty");
        };

        string nameCache;
        if (user.Coach != null)
        {
            List<UserDto> users;
            users = _userRepository.GetAllUsersExceptMe(request.Id);

            var jsonResult = JsonConvert.SerializeObject(users, Formatting.Indented);

            return await Task.FromResult(jsonResult);
        }
        else
        {
            List<CoachDto> coaches;
            nameCache = "GetCoachesCache";

            coaches = _userRepository.GetAllCoachesExceptMe(request.Id);

            var jsonResult = JsonConvert.SerializeObject(coaches, Formatting.Indented);

            return await Task.FromResult(jsonResult);
        }
    }
}
