using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.DietForm;
public class GetAllDietFormOptionsResponeAndUserChoices
{ 
    public HashSet<ActivityModeDto>? activityModes {get; set;}
    public HashSet<DietModeDto>? dietModes { get; set; }
    public HashSet<CookingRangeDto>? cookingRanges { get; set; }

    public ActivityModeDto? activityMode { get; set; }
    public DietModeDto? dietMode { get; set; }
    public CookingRangeDto? cookingRange { get; set; }
};
