using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.GetStarted;
public record AddObligatoryFormRequest
(
    int Weight,
    int Height,
    int Years,
    string Gender,
    string[] Allergies
);
