using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.Allergy.Commands.UpdateAllergy;
public class UpdateAllergyCommandHandler : IRequestHandler<UpdateAllergyCommand>
{

    private readonly IAllergyRepository _allergyRepository;

    public UpdateAllergyCommandHandler(IAllergyRepository allergyRepository)
    {
        _allergyRepository = allergyRepository;
    }

    public async Task<Unit> Handle(UpdateAllergyCommand request, CancellationToken cancellationToken)
    {
        if (_allergyRepository.GetAllergyById(request.Id) is null)
        {
            throw new Exception("Such an allergy does not exist");
        }

        var allergy = new FitnessApp.Domain.Entities.Allergy
        {
            Name = request.Name,
            Class = request.Class,
            Food = request.Food,
            Group = request.Group,
            Type = request.Type
        };

        _allergyRepository.Update(request.Id, allergy);

        return Unit.Value;
    }
}