using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;
using Newtonsoft.Json;

namespace FitnessApp.Application.Allergy.Queries.GettAllAllergies;
public class GetAllAllergiesQueryHandler : IRequestHandler<GetAllAllergiesQuery, string>
{

    private readonly IAllergyRepository _allergyRepository;

    public GetAllAllergiesQueryHandler(IAllergyRepository allergyRepository)
    {
        _allergyRepository = allergyRepository;
    }

    public Task<string> Handle(GetAllAllergiesQuery request, CancellationToken cancellationToken)
    {
        var allergies = _allergyRepository.GetAllAlergies();

        if (allergies == null || allergies.Count == 0) 
        {
            return Task.FromResult("empty");
        }

        var jsonResult = JsonConvert.SerializeObject(allergies, Formatting.Indented);

        return Task.FromResult(jsonResult);
    }
}
