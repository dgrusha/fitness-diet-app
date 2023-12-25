using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.TrainingMode.Commands.AddTrainingMode;
public record AddTrainingModeCommand
(
    string Name
) : IRequest<HttpResponseMessage>;
