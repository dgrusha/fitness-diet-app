using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.DietMode;
public record AddDietModeRequest
(
    string Name,
    float Coeficient
);