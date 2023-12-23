using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DietForm;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.DietForm.Queries.GetUserChoicesFrom;
public class GetUserChociesFormQueryHandler : IRequestHandler<GetUserChoicesFormQuery, UniqueResponse<GetUserDataFormOptions>>
{
    private readonly IUserRepository _userRepository;
    private readonly IDietFormRepository _dietFormRepository;

    public GetUserChociesFormQueryHandler(IUserRepository userRepository, IDietFormRepository dietFormRepository)
    {
        _userRepository = userRepository;
        _dietFormRepository = dietFormRepository;
    }

    public async Task<UniqueResponse<GetUserDataFormOptions>> Handle(GetUserChoicesFormQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetUserDataFormOptions>();

        try
        {
            if (_userRepository.GetUserById(request.Id) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (user.ObligatoryForm == null || user.DietForm == null)
            {
                response.Errors.Add("User with this id does not fulfilled all needed data for enabling edit");
                response.ErrorCode = (int)HttpStatusCode.FailedDependency;
                return response;
            };

            var dietForm = _dietFormRepository.GetDietFormByUserId(user.Id);

            if (dietForm == null) 
            {
                response.Errors.Add("User with this id does not fulfilled all needed data for enabling edit");
                response.ErrorCode = (int)HttpStatusCode.FailedDependency;
                return response;
            }

            if (dietForm.ActivityMode == null || dietForm.DietMode == null || dietForm.CookingRange == null) 
            {
                response.Errors.Add("User does not have needed information from diet");
                response.ErrorCode = (int)HttpStatusCode.FailedDependency;
                return response;
            }

            response.Data = new GetUserDataFormOptions();
            response.Data.cookingRange = new CookingRangeDto { Id = dietForm.CookingRange.Id, Name = dietForm.CookingRange.Name };
            response.Data.activityMode = new ActivityModeDto{ Id = dietForm.ActivityMode.Id, Name = dietForm.ActivityMode.Name };
            response.Data.dietMode = new DietModeDto { Id = dietForm.DietMode.Id, Name = dietForm.DietMode.Name };

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