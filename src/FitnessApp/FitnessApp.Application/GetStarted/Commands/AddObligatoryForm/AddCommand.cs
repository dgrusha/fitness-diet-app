using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.GetStarted.Commands.AddObligatoryForm;
public record AddCommand
(
    Guid Id, 
    int Weight,
    int Height
) : IRequest<Unit>;
