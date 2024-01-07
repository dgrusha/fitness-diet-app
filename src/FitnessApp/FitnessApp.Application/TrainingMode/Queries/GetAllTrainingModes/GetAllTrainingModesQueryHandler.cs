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

namespace FitnessApp.Application.TrainingMode.Queries.GetAllTrainingModes;
public class GetAllTrainingModesQueryHandler : IRequestHandler<GetAllTrainingModesQuery, HashSet<TrainingModeDto>>
{
    private readonly ITrainingModeRepository _trainignModeRepository;
    private readonly IDistributedCache _cache;

    public GetAllTrainingModesQueryHandler(IDistributedCache cache, ITrainingModeRepository trainignModeRepository)
    {
        _cache = cache;
        _trainignModeRepository = trainignModeRepository;
    }

    public async Task<HashSet<TrainingModeDto>> Handle(GetAllTrainingModesQuery request, CancellationToken cancellationToken)
    {
        string cacheString = "TrainingModesCache";
        var cachedResult = await _cache.GetStringAsync(cacheString);

        if (!string.IsNullOrEmpty(cachedResult))
        {
            return JsonConvert.DeserializeObject<HashSet<TrainingModeDto>>(cachedResult);
        }

        var modes = _trainignModeRepository.GetAll();

        if (modes == null || modes.Count == 0)
        {
            return new HashSet<TrainingModeDto>();
        }

        var jsonResult = JsonConvert.SerializeObject(modes, Formatting.Indented);

        await _cache.SetStringAsync(cacheString, jsonResult, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(7)
        });

        return JsonConvert.DeserializeObject<HashSet<TrainingModeDto>>(jsonResult);
    }
}
