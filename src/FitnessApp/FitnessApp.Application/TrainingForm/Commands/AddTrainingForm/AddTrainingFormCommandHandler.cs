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

namespace FitnessApp.Application.TrainingForm.Commands.AddTrainingForm;
public class AddTrainingFormCommandHandler : IRequestHandler<AddTrainingFormCommand, UniqueResponse<GetUserProfileStatuses>>
{
    private readonly IUserRepository _userRepository;
    private readonly ITrainingModeRepository _trainingModeRepository;
    private readonly ITrainingFormRepository _trainingFormRepository;

    public AddTrainingFormCommandHandler(IUserRepository userRepository, ITrainingModeRepository trainingModeRepository, ITrainingFormRepository trainingFormRepository)
    {
        _userRepository = userRepository;
        _trainingModeRepository = trainingModeRepository;
        _trainingFormRepository = trainingFormRepository;
    }

    public async Task<UniqueResponse<GetUserProfileStatuses>> Handle(AddTrainingFormCommand request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetUserProfileStatuses>();
        try
        {
            if (_userRepository.GetUserById(request.UserId) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (user.ObligatoryForm == null)
            {
                response.Errors.Add("This user has no fulfilled Obligatory form");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            if (user.TrainingForm != null)
            {
                response.Errors.Add("This user has already fulfilled Training form");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            if (_trainingModeRepository.GetById(request.TrainingModeId) is not Domain.Entities.TrainingMode trainingMode)
            {
                response.Errors.Add("Such cooking range does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if(request.Days < 1 || request.Days > 5) 
            {
                response.Errors.Add("Days to train weekly should be in range from 1 to 5");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            string[] daysOfWeek = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
            int daysPerWeek = 7 / request.Days;
            List<string> daysChosen = new List<string>();
            for (int i = 0; i < request.Days; i++)
            {
                int dayIndex = i * daysPerWeek;
                daysChosen.Add(daysOfWeek[dayIndex]);
            }

            Domain.Entities.TrainingForm trainingForm = new Domain.Entities.TrainingForm
            {
                User = user,
                TrainingMode = trainingMode,
                Days = daysChosen
            };

            _trainingFormRepository.Add(trainingForm);
            _userRepository.UpdateUserTrainingStatus(user, PreparingStatus.ToTake);

            response.Data = new GetUserProfileStatuses(
                user.DietStatus,
                PreparingStatus.ToTake
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
