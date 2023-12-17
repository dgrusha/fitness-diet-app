using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class RecipeRepository : IRecipeRepository
{
    private readonly FitnessContext _recipeContext;

    public RecipeRepository(FitnessContext recipeContext)
    {
        _recipeContext = recipeContext;
    }

    public void Add(Recipe recipe)
    {
        _recipeContext.Recipes.Add(recipe);
        _recipeContext.SaveChanges();
    }

    public List<DietDataDto> GetDietRecipes(Guid dietFormId)
    {
        return _recipeContext.Recipes
            .Where(u => u.DietFormId == dietFormId)
            .Select(u => new DietDataDto
            {
                Id = u.Id,
                DayOfTheWeek = u.DayOfTheWeek,
                DishType = u.DishType,
                Name = u.Name,
                Description = u.Description,
                Comment = u.Comment,
                Calories = u.Calories,
                Carbohydrate = u.Carbohydrate,
                Fat = u.Fat,
                Protein = u.Protein,
                IngredientsStr = string.Join(", ", u.Ingredients),
                Ingredients = u.Ingredients
            })
            .ToList();
    }

    public void Update(Guid id, Recipe recipe)
    {
        var recipeFromDb = _recipeContext.Recipes.SingleOrDefault(recipe => recipe.Id == id);
        if (recipeFromDb != null)
        {
            recipeFromDb.Comment = recipe.Comment;
            _recipeContext.SaveChanges();
        }
    }
}
