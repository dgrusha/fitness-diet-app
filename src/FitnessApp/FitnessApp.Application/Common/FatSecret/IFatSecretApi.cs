using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.FatSecret;
public interface IFatSecretApi
{
    Task<string> Authenticate();
    Task<string> GetRecipes(string accessToken, CalorieRangeDto calories, FitnessApp.Domain.Entities.CookingRange cookingRange, string typeRecipe);
    Task<string> GetRecipeDesc(string accessToken, string id);
}
