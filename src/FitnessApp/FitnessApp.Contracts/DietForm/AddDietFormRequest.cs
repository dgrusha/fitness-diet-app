using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.DietForm;
public record AddDietFormRequest
(   
    string ActivityModeId,
    string DietModeId,
    string CookingRangeId
);
