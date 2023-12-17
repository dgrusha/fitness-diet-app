using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DietData;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.DietData.Queries.GetDietData;
public record GetDietDataQuery
(
    Guid Id
) : IRequest<UniqueResponse<GetDietDataResult>>;
