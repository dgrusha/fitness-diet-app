using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class RecipeInstructionRepository : IRecipeInstructionRepository
{
    private readonly FitnessContext _recipeInstructionContext;

    public RecipeInstructionRepository(FitnessContext recipeInstructionContext)
    {
        _recipeInstructionContext = recipeInstructionContext;
    }

    public void Add(RecipeInstruction recipeInstruction)
    {
        _recipeInstructionContext.RecipeInstructions.Add(recipeInstruction);
        _recipeInstructionContext.SaveChanges();
    }
}
