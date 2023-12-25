using System;
using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.TrainingForm;
public class GetAllTrainingOptionsResponse
{
    public HashSet<TrainingModeDto>? trainingModes { get; set; }
}
