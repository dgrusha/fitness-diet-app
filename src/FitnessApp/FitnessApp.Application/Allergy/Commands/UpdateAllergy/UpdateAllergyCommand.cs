using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Allergy.Commands.UpdateAllergy;
public record UpdateAllergyCommand
(
    string Name,
    string Class,
    string Type,
    string Group,
    string Food,
    Guid Id
) : IRequest<Unit>;
