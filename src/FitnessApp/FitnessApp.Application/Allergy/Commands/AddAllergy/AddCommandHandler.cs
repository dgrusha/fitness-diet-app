using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.Allergy.Commands.AddAllergy;
public class AddCommandHandler : IRequestHandler<AddCommand>
{
    private readonly IAllergyRepository _allergyRepository;

    public AddCommandHandler(IAllergyRepository allergyRepository)
    {
        _allergyRepository = allergyRepository;
    }

    public async Task<Unit> Handle(AddCommand request, CancellationToken cancellationToken)
    {

        if (_allergyRepository.GetAllergyByAllParameters(request.Name, request.Class, request.Type, request.Group, request.Food) is not null) 
        {
            throw new Exception("Such an allergy already exists");
        }

        var allergy = new FitnessApp.Domain.Entities.Allergy 
        {
            Name = request.Name,
            Class = request.Class,
            Food = request.Food,
            Group = request.Group,
            Type = request.Type
        };

        _allergyRepository.Add(allergy);

        return Unit.Value;
    }
}
