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

        List<UserDto> users;
        string nameCache = "GetUsersCache";
        if (user.Coach != null)
        {
            nameCache = "GetUsersCache";
            var cachedResult = await _cache.GetStringAsync(nameCache);
            if (!string.IsNullOrEmpty(cachedResult))
            {
                return cachedResult;
            }
            users = _userRepository.GetAllUsersExceptMe(request.Id);
        }
        else 
        {
            nameCache = "GetCoachesCache";
            var cachedResult = await _cache.GetStringAsync(nameCache);
            if (!string.IsNullOrEmpty(cachedResult))
            {
                return cachedResult;
            }
            users = _userRepository.GetAllCoachesExceptMe(request.Id);
        }

        if (users == null || users.Count == 0)
        {
            return await Task.FromResult("empty");
        }

        var jsonResult = JsonConvert.SerializeObject(users, Formatting.Indented);
        await _cache.SetStringAsync(nameCache, jsonResult, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1)
        });

        return await Task.FromResult(jsonResult);
    }
}
