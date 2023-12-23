using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class RecipeInstruction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Instruction { get; set; }
    public int Order { get; set; }
    public Guid RecipeId { get; set; }
    public Recipe Recipe { get; set; }
}
