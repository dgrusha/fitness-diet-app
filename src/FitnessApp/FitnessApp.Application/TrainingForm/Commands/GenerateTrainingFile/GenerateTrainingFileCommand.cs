﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.TrainingForm.Commands.GenerateTrainingFile;
public record GenerateTrainingFileCommand
(
    Guid UserId
) : IRequest<HttpResponseMessage>;
