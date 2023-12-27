using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class CookingRange
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public int MinuteStart { get; set; }
    public int MinuteEnd { get; set; }
    public ICollection<DietForm> DietForms { get; set; } = new List<DietForm>();

}
