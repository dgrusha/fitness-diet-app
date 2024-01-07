using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.DietForm.Commands.GenerateDietFile;
public record GenerateDietFileCommand
(
    Guid UserId
) : IRequest<HttpResponseMessage>;
