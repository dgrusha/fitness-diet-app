using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;
using Newtonsoft.Json;

namespace FitnessApp.Application.GetStarted.Queries.GetAllObligatoryForm;
public class GetAllObligatoryFormQueryHandler : IRequestHandler<GetAllObligatoryFormQuery, string>
{

    private readonly IObligatoryFormRepository _obligatoryFormRepository;

    public GetAllObligatoryFormQueryHandler(IObligatoryFormRepository obligatoryFormRepository)
    {
        _obligatoryFormRepository = obligatoryFormRepository;
    }

    public Task<string> Handle(GetAllObligatoryFormQuery request, CancellationToken cancellationToken)
    {
        try 
        {
            var forms = _obligatoryFormRepository.GetAllForms();

            if (forms == null || forms.Count == 0)
            {
                return Task.FromResult("empty");
            }

            var jsonResult = JsonConvert.SerializeObject(forms, Formatting.Indented);

            return Task.FromResult(jsonResult);
        }
        catch (Exception ex)
        {
            return Task.FromResult("empty");
        }

    }
}
