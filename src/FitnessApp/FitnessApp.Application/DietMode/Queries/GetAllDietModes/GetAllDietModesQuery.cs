using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using MediatR;

namespace FitnessApp.Application.DietMode.Queries.GetAllDietModes;
public class GetAllDietModesQuery : IRequest<HashSet<DietModeDto>>
{
    // No properties needed for this query
}
