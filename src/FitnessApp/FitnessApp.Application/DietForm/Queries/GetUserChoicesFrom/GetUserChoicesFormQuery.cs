using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DietForm;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.DietForm.Queries.GetUserChoicesFrom;
public record GetUserChoicesFormQuery
(
    Guid Id
) : IRequest<UniqueResponse<GetUserDataFormOptions>>;