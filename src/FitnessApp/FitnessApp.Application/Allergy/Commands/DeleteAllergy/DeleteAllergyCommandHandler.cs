using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.Allergy.Commands.DeleteAllergy;
public class DeleteAllergyCommandHandler : IRequestHandler<DeleteAllergyCommand>
{

    private readonly IAllergyRepository _allergyRepository;

    public DeleteAllergyCommandHandler(IAllergyRepository allergyRepository)
    {
        _allergyRepository = allergyRepository;
    }

    public async Task<Unit> Handle(DeleteAllergyCommand request, CancellationToken cancellationToken)
    {
        if (_allergyRepository.GetAllergyById(request.Id) is null)
        {
            throw new Exception("Such an allergy does not exist");
        }

        _allergyRepository.Delete(request.Id);

        return Unit.Value;
    }
}
