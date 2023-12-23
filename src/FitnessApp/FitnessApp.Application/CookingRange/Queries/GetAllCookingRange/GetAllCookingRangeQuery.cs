using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using MediatR;

namespace FitnessApp.Application.CookingRange.Queries.GetAllCookingRange;
public class GetAllCookingRangeQuery : IRequest<HashSet<CookingRangeDto>>
{
    // No properties needed for this query
}
