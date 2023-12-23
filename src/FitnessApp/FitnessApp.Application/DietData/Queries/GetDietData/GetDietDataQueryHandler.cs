using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Dumpify;
using FitnessApp.Application.Common.DietData;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.DietData.Queries.GetDietData;
public class GetDietDataQueryHandler : IRequestHandler<GetDietDataQuery, UniqueResponse<GetDietDataResult>>
{
    private readonly IDietFormRepository _dietFormRepository;
    private readonly IUserRepository _userRepository;
    private readonly IRecipeRepository _recipeRepository;

    public GetDietDataQueryHandler(IDietFormRepository dietFormRepository, IUserRepository userRepository, IRecipeRepository recipeRepository)
    {
        _dietFormRepository = dietFormRepository;
        _userRepository = userRepository;
        _recipeRepository = recipeRepository;
    }

    public async Task<UniqueResponse<GetDietDataResult>> Handle(GetDietDataQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetDietDataResult>();

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
                response.Errors.Add("User with this id does not fulfilled all needed data");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            var recipes = _recipeRepository.GetDietRecipes(user.DietForm.Id);
            if (recipes.Count() == 0) 
            {
                response.Errors.Add("There is no recipes for this user");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }
            HashSet<string> ingridients = new HashSet<string>();
            foreach (var recipe in recipes) 
            {
                foreach(var food in recipe.Ingredients) 
                {
                    ingridients.Add(food);
                }
            }
            recipes = recipes.OrderBy(r => r.DishType).ToList();
            Dictionary<string, List<DietDataDto>> resultDict = new Dictionary<string, List<DietDataDto>>();
            resultDict.Add("0", recipes.Where(r => r.DayOfTheWeek == 1).ToList());
            resultDict.Add("1", recipes.Where(r => r.DayOfTheWeek == 2).ToList());
            resultDict.Add("2", recipes.Where(r => r.DayOfTheWeek == 3).ToList());
            resultDict.Add("3", recipes.Where(r => r.DayOfTheWeek == 4).ToList());
            resultDict.Add("4", recipes.Where(r => r.DayOfTheWeek == 5).ToList());
            resultDict.Add("5", recipes.Where(r => r.DayOfTheWeek == 6).ToList());
            resultDict.Add("6", recipes.Where(r => r.DayOfTheWeek == 7).ToList());
            response.Data = new GetDietDataResult(
                    resultDict,
                    ingridients.ToList()
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
