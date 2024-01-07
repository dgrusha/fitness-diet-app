using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FitnessApp.Contracts.CoachClientManagement;
public record UpdateTrainingDataByCoachRequest
(
    string ExerciseId,
    string UserId,
    string? Text,
    IFormFile? File
);
