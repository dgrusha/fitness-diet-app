using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.TrainingData.Queries.GetTrainingData;
public class GetTrainingDataQueryHandler : IRequestHandler<GetTrainingDataQuery, UniqueResponse<Dictionary<string, Dictionary<string, List<Common.DTO.ExcerciseDto>>>>>
{
    private readonly IUserRepository _userRepository;
    private readonly ITrainingFormRepository _trainingFormRepository;
    private readonly IExcerciseRepository _excerciseRepository;

    public GetTrainingDataQueryHandler(IExcerciseRepository excerciseRepository, ITrainingFormRepository trainingFormRepository, IUserRepository userRepository)
    {
        _excerciseRepository = excerciseRepository;
        _trainingFormRepository = trainingFormRepository;
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<Dictionary<string, Dictionary<string, List<Common.DTO.ExcerciseDto>>>>> Handle(GetTrainingDataQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<Dictionary<string, Dictionary<string, List<Common.DTO.ExcerciseDto>>>>();
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
                response.Errors.Add("User with this id does not fulfilled all needed data");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            var exercises = _excerciseRepository.GetTrainingExcercises(user.TrainingForm.Id);
            if (exercises.Count() == 0)
            {
                response.Errors.Add("There is no excercises for this user");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            Dictionary<string, Dictionary<string, List<Common.DTO.ExcerciseDto>>>? groupedExercises = exercises
            .GroupBy(exercise => exercise.Day)
            .ToDictionary(
                dayGroup => dayGroup.Key.ToString(),
                dayGroup => dayGroup
                    .GroupBy(exercise => exercise.Part)
                    .ToDictionary(
                        partGroup => partGroup.Key.ToLower(),
                        partGroup => partGroup.ToList()
                    )
            );

            response.Data = groupedExercises;
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
