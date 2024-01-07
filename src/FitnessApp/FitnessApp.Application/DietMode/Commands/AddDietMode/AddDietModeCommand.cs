using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.DietMode.Commands.AddDietMode;
public record AddDietModeCommand
(
    Guid UserId,
    string Name,
    float Coeficient
) : IRequest<HttpResponseMessage>;
