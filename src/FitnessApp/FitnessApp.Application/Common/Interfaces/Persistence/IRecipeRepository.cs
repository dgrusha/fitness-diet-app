using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IRecipeRepository
{
    void Add(Recipe recipe);
    void Update(Guid id, Recipe recipe);
    void DeleteRecipesByIdOfDietForm(Guid id);
    List<DietDataDto> GetDietRecipes(Guid dietFormId);

}
