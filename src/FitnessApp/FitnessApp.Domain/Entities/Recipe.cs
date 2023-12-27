using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class Recipe
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int DayOfTheWeek { get; set; }
    public string DishType { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string? Comment { get; set; }
    public double Calories { get; set; }
    public double Carbohydrate { get; set; }
    public double Fat { get; set; }
    public double Protein { get; set; }
    public double Cholesterol { get; set; }
    public double Iron { get; set; }
    public double Sugar { get; set; }
    public double TransFat { get; set; }

    public List<string> Ingredients = new List<string>();

    public List<RecipeInstruction> Instructions = new List<RecipeInstruction>();
    public Guid DietFormId { get; set; }
    public DietForm DietForm { get; set; }
}
