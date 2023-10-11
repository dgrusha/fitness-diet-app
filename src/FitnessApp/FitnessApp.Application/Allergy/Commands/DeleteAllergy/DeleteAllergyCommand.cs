using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Allergy.Commands.DeleteAllergy;
public record DeleteAllergyCommand
(
    Guid Id
) : IRequest<Unit>;