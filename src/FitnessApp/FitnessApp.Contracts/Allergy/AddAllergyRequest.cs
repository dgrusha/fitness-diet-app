using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.Allergy;

public record AddAllergyRequest
(
    string Name,
    string Class,
    string Type,
    string Group,
    string Food
);
