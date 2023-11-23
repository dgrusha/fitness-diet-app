using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.CookingRange.Commands.AddCookingRange;
public record AddCookingRangeCommand
(
    Guid UserId,
    string Name,
    int MinuteStart,
    int MinuteEnd
) : IRequest<HttpResponseMessage>;