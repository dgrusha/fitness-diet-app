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

namespace FitnessApp.Application.CookingRange.Queries.GetAllCookingRange;
public class GetAllCookingRangeQueryHandler : IRequestHandler<GetAllCookingRangeQuery, HashSet<CookingRangeDto>>
{
    private readonly ICookingRangeRepository _cookingRangeRepository;
    private readonly IDistributedCache _cache;

    public GetAllCookingRangeQueryHandler(ICookingRangeRepository cookingRangeRepository, IDistributedCache cache)
    {
        _cookingRangeRepository = cookingRangeRepository;
        _cache = cache;
    }

    public async Task<HashSet<CookingRangeDto>> Handle(GetAllCookingRangeQuery request, CancellationToken cancellationToken)
    {
        string cacheString = "CookingRangeCache";
        var cachedResult = await _cache.GetStringAsync(cacheString);

        if (!string.IsNullOrEmpty(cachedResult))
        {
            return JsonConvert.DeserializeObject<HashSet<CookingRangeDto>>(cachedResult);
        }

        var cookingRanges = _cookingRangeRepository.GetAll();

        if (cookingRanges == null || cookingRanges.Count == 0)
        {
            return new HashSet<CookingRangeDto>();
        }

        var jsonResult = JsonConvert.SerializeObject(cookingRanges, Formatting.Indented);

        await _cache.SetStringAsync(cacheString, jsonResult, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(7)
        });

        return JsonConvert.DeserializeObject<HashSet<CookingRangeDto>>(jsonResult);
    }
}
