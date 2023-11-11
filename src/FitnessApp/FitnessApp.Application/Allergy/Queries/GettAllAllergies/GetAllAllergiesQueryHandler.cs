using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace FitnessApp.Application.Allergy.Queries.GettAllAllergies;
public class GetAllAllergiesQueryHandler : IRequestHandler<GetAllAllergiesQuery, string>
{

    private readonly IAllergyRepository _allergyRepository;
    private readonly IDistributedCache _cache;

    public GetAllAllergiesQueryHandler(IAllergyRepository allergyRepository, IDistributedCache cache)
    {
        _allergyRepository = allergyRepository;
        _cache = cache;
    }

    public async Task<string> Handle(GetAllAllergiesQuery request, CancellationToken cancellationToken)
    {

        var cachedResult = await _cache.GetStringAsync("AllergiesCache");

        if (!string.IsNullOrEmpty(cachedResult))
        {
            return cachedResult;
        }

        var allergies = _allergyRepository.GetAllAlergies();

        if (allergies == null || allergies.Count == 0) 
        {
            return await Task.FromResult("empty");
        }

        var jsonResult = JsonConvert.SerializeObject(allergies, Formatting.Indented);

        await _cache.SetStringAsync("AllergiesCache", jsonResult, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(7)
        }); 

        return await Task.FromResult(jsonResult);
    }
}
