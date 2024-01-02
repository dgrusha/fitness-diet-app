using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.CoachClientManagement;
public record UpdateDietDataByCoachRequest
(
    string userId,
    string recipeId,
    string text
);
