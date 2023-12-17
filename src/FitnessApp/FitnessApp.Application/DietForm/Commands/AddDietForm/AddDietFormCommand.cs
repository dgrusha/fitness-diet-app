using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.DietForm.Commands.AddDietForm;
public record AddDietFormCommand
(
    Guid UserId,
    Guid ActivityModeId, 
    Guid DietModeId, 
    Guid CookingRangeId
): IRequest<UniqueResponse<GetUserProfileStatuses>>;
