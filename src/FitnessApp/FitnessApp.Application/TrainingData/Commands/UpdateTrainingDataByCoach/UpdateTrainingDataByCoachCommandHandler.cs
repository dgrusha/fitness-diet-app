using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.TrainingData.Commands.UpdateTrainingDataByCoach;
public class UpdateTrainingDataByCoachCommandHandler : IRequestHandler<UpdateTrainingDataByCoachCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly IExcerciseRepository _excerciseRepository;

    public UpdateTrainingDataByCoachCommandHandler(IExcerciseRepository excerciseRepository, IUserRepository userRepository)
    {
        _excerciseRepository = excerciseRepository;
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(UpdateTrainingDataByCoachCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var coach = _userRepository.GetUserById(request.CoachId);

            if (coach == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a coach does not exist"),
                };
            }

            if (coach.Coach == null || coach.Coach.IsVerified == false)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a coach does not exist"),
                };
            }

            if (request.Text == null && request.FileName == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Data is not fulfilled"),
                };
            }

            bool isUserInSubcribedCoach = false;
            List<UserWithIdDto> users = _userRepository.GetAllCoachesPrescribedUsers(coach.Coach.Id);
            foreach (var item in users)
            {
                if (item.Id == request.UserId)
                {
                    isUserInSubcribedCoach = true;
                }
            }

            if (isUserInSubcribedCoach == false)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("This coach is not coaching such a client"),
                };
            }

            var exerciseToUpdate = _excerciseRepository.GetRecipeByUserAndExerciseId(request.UserId, request.ExerciseId);
            if (exerciseToUpdate == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("No such exercise exist"),
                };
            }
            exerciseToUpdate.Comment = request.Text;
            exerciseToUpdate.FileName = request.FileName;
            _excerciseRepository.Update(exerciseToUpdate.Id, exerciseToUpdate);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Comment was added successfully"),
            };
        }
        catch (Exception ex)
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent($"An error occurred: {ex.Message}"),
            };
        }
    }
}
