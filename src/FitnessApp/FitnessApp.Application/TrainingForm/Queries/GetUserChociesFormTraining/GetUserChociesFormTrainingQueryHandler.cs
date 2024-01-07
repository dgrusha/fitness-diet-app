using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Common.TrainingForm;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.TrainingForm.Queries.GetUserChociesFormTraining;
public class GetUserChociesFormTrainingQueryHandler : IRequestHandler<GetUserChociesFormTrainingQuery, UniqueResponse<GetUserDataFormTrainingOptions>>
{
    private readonly IUserRepository _userRepository;
    private readonly ITrainingFormRepository _trainingFormRepository;

    public GetUserChociesFormTrainingQueryHandler(ITrainingFormRepository trainingFormRepository, IUserRepository userRepository)
    {
        _trainingFormRepository = trainingFormRepository;
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<GetUserDataFormTrainingOptions>> Handle(GetUserChociesFormTrainingQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetUserDataFormTrainingOptions>();

        try
        {
            if (_userRepository.GetUserById(request.Id) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (user.ObligatoryForm == null || user.TrainingForm == null)
            {
                response.Errors.Add("User with this id does not fulfilled all needed data for enabling edit");
                response.ErrorCode = (int)HttpStatusCode.FailedDependency;
                return response;
            };

            var trainingForm = _trainingFormRepository.GetTrainingFormByUserId(request.Id);

            if (trainingForm == null)
            {
                response.Errors.Add("User with this id does not fulfilled all needed data for enabling edit");
                response.ErrorCode = (int)HttpStatusCode.FailedDependency;
                return response;
            }

            if (trainingForm.TrainingMode == null || trainingForm.Days.Count() == 0)
            {
                response.Errors.Add("User does not have needed information from diet");
                response.ErrorCode = (int)HttpStatusCode.FailedDependency;
                return response;
            }

            response.Data = new GetUserDataFormTrainingOptions();
            response.Data.trainingMode = new TrainingModeDto { Id = trainingForm.TrainingMode.Id, Name= trainingForm.TrainingMode.Name };
            response.Data.days = trainingForm.Days.Count();

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
