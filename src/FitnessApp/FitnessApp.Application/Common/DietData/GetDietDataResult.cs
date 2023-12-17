using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.DietData;
public record GetDietDataResult
(
    Dictionary<string, List<DietDataDto>> recipes,
    List<string> Ingredients
);
