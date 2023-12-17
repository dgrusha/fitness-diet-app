using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using MediatR;

namespace FitnessApp.Application.ActivityMode.Queries.GetAllActivityModes;
public class GetAllActivityModesQuery : IRequest<HashSet<ActivityModeDto>>
{
    // No properties needed for this query
}
