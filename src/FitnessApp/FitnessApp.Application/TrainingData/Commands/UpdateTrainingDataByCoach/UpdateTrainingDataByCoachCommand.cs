using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.TrainingData.Commands.UpdateTrainingDataByCoach;
public record UpdateTrainingDataByCoachCommand
(
    Guid CoachId,
    Guid UserId,
    Guid ExerciseId,
    string? Text,
    string? FileName
) : IRequest<HttpResponseMessage>;
