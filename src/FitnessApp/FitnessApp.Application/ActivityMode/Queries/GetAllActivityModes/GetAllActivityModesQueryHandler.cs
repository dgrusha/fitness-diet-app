using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace FitnessApp.Application.ActivityMode.Queries.GetAllActivityModes;
public class GetAllActivityModesQueryHandler : IRequestHandler<GetAllActivityModesQuery, HashSet<ActivityModeDto>>
{
    private readonly IActivityModeRepository _activityModeRepository;
    private readonly IDistributedCache _cache;

    public GetAllActivityModesQueryHandler(IActivityModeRepository activityModeRepository, IDistributedCache cache)
    {
        _activityModeRepository = activityModeRepository;
        _cache = cache;
    }

    public async Task<HashSet<ActivityModeDto>> Handle(GetAllActivityModesQuery request, CancellationToken cancellationToken)
    {
        string cacheString = "ActivityModesCache";
        var cachedResult = await _cache.GetStringAsync(cacheString);

        if (!string.IsNullOrEmpty(cachedResult))
        {
            return JsonConvert.DeserializeObject<HashSet<ActivityModeDto>>(cachedResult);
        }

        var modes = _activityModeRepository.GetAll();

        if (modes == null || modes.Count == 0)
        {
            return new HashSet<ActivityModeDto>();
        }

        var jsonResult = JsonConvert.SerializeObject(modes, Formatting.Indented);

        await _cache.SetStringAsync(cacheString, jsonResult, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(7)
        });

        return JsonConvert.DeserializeObject<HashSet<ActivityModeDto>>(jsonResult);
    }
}
