using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class DietForm
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid DietModeId { get; set; }
    public DietMode DietMode { get; set; }

    public Guid ActivityModeId { get; set; }
    public ActivityMode ActivityMode { get; set; }

    public Guid CookingRangeId { get; set; }
    public CookingRange CookingRange { get; set; }

}