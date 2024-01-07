using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.DietForm.Commands.UpdateDietForm;
public class UpdateDietFormCommandHandler : IRequestHandler<UpdateDietFormCommand, UniqueResponse<GetUserProfileStatuses>>
{
    readonly IUserRepository _userRepository;
    private readonly IActivityModeRepository _activityModeRepository;
    private readonly IDietModeRepository _dietModeRepository;
    private readonly IDietFormRepository _dietFormRepository;
    private readonly ICookingRangeRepository _cookingRangeRepository;
    private readonly IRecipeRepository _recipeRepository;

    public UpdateDietFormCommandHandler
        (
            IUserRepository userRepository,
            IActivityModeRepository activityModeRepository,
            IDietModeRepository dietModeRepository,
            IDietFormRepository dietFormRepository,
            ICookingRangeRepository cookingRangeRepository,
            IRecipeRepository recipeRepository
        )
    {
        _userRepository = userRepository;
        _activityModeRepository = activityModeRepository;
        _dietModeRepository = dietModeRepository;
        _dietFormRepository = dietFormRepository;
        _cookingRangeRepository = cookingRangeRepository;
        _recipeRepository = recipeRepository;
    }



    public async Task<UniqueResponse<GetUserProfileStatuses>> Handle(UpdateDietFormCommand request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetUserProfileStatuses>();
        try
        {
            if (_userRepository.GetUserById(request.UserId) is not User user)
            {
                response.Errors.Add("User with this email does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (user.ObligatoryForm == null)
            {
                response.Errors.Add("This user has no fulfilled Obligatory form");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            if (user.DietForm == null)
            {
                response.Errors.Add("This user has no fulfilled Diet form");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            if (_cookingRangeRepository.GetById(request.CookingRangeId) is not Domain.Entities.CookingRange cookingRange)
            {
                response.Errors.Add("Such cooking range does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (_activityModeRepository.GetById(request.ActivityModeId) is not Domain.Entities.ActivityMode activityMode)
            {
                response.Errors.Add("Such activity mode does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (_dietModeRepository.GetById(request.DietModeId) is not Domain.Entities.DietMode dietMode)
            {
                response.Errors.Add("Such diet mode does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            Domain.Entities.DietForm dietForm = new Domain.Entities.DietForm
            {
                User = user,
                DietMode = dietMode,
                ActivityMode = activityMode,
                CookingRange = cookingRange,
            };

            _dietFormRepository.Update(user.DietForm.Id, dietForm);
            _recipeRepository.DeleteRecipesByIdOfDietForm(user.DietForm.Id);
            _userRepository.UpdateUserDietStatus(user, PreparingStatus.ToTake);

            response.Data = new GetUserProfileStatuses(
                PreparingStatus.ToTake,
                user.TrainingStatus
            );
            response.ErrorCode = (int)HttpStatusCode.OK;
        }
        catch (Exception ex)
        {
            response.Errors.Add(ex.Message);
            response.ErrorCode = (int)HttpStatusCode.InternalServerError;
        }
        return response;
    }
}
