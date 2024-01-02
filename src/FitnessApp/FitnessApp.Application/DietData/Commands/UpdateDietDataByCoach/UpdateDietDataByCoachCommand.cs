using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.DietData.Commands.UpdateDietDataByCoach;
public record UpdateDietDataByCoachCommand
(
    Guid CoachId,
    Guid UserId,
    Guid RecipeId,
    string Text
) : IRequest<HttpResponseMessage>;

