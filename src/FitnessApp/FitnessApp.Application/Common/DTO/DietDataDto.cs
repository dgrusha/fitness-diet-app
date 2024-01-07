using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.DTO;
public class DietDataDto
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
    public string IngredientsStr { get; set; }

    public List<string> Ingredients = new List<string>();
}
