using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Allergy.Commands.AddAllergy;
public record AddCommand
(
    string Name,
    string Class,
    string Type,
    string Group,
    string Food
) : IRequest<Unit>;
