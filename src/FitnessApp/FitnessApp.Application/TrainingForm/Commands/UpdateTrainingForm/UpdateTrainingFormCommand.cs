﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.TrainingForm.Commands.UpdateTrainingForm;
public record UpdateTrainingFormCommand
(
    Guid UserId,
    Guid TrainingModeId,
    int Days
) : IRequest<UniqueResponse<GetUserProfileStatuses>>;
