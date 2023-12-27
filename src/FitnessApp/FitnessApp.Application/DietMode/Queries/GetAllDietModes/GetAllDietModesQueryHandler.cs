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

namespace FitnessApp.Application.DietMode.Queries.GetAllDietModes;
public class GetAllDietModesQueryHandler : IRequestHandler<GetAllDietModesQuery, HashSet<DietModeDto>>
{
    private readonly IDietModeRepository _dietModeRepository;
    private readonly IDistributedCache _cache;

    public GetAllDietModesQueryHandler(IDietModeRepository dietModeRepository, IDistributedCache cache)
    {
        _dietModeRepository = dietModeRepository;
        _cache = cache;
    }

    public async Task<HashSet<DietModeDto>> Handle(GetAllDietModesQuery request, CancellationToken cancellationToken)
    {
        string cacheString = "DietModesCache";
        var cachedResult = await _cache.GetStringAsync(cacheString);

        if (!string.IsNullOrEmpty(cachedResult))
        {
            return JsonConvert.DeserializeObject<HashSet<DietModeDto>>(cachedResult);
        }

        var modes = _dietModeRepository.GetAll();

        if (modes == null || modes.Count == 0)
        {
            return new HashSet<DietModeDto>();
        }

        var jsonResult = JsonConvert.SerializeObject(modes, Formatting.Indented);

        await _cache.SetStringAsync(cacheString, jsonResult, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(7)
        });

        return JsonConvert.DeserializeObject<HashSet<DietModeDto>>(jsonResult);
    }
}
