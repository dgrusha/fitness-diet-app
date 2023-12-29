using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.DietData.Commands.UpdateDietDataByCoach;
public class UpdateDietDataByCoachCommandHandler : IRequestHandler<UpdateDietDataByCoachCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly IRecipeRepository _recipeRepository;

    public UpdateDietDataByCoachCommandHandler(IRecipeRepository recipeRepository, IUserRepository userRepository)
    {
        _recipeRepository = recipeRepository;
        _userRepository = userRepository;
    }

    public async Task<HttpResponseMessage> Handle(UpdateDietDataByCoachCommand request, CancellationToken cancellationToken)
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

            if (request.Text == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Text is not fulfilled"),
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

            var recipeToUpdate = _recipeRepository.GetRecipeByUserAndRecipeId(request.UserId, request.RecipeId);
            if (recipeToUpdate == null) 
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("No such recipe exist"),
                };
            }
            recipeToUpdate.Comment = request.Text;
            _recipeRepository.Update(recipeToUpdate.Id, recipeToUpdate);

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
