using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class TrainingMode
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }

    public ICollection<TrainingForm> TrainingForms { get; set; } = new List<TrainingForm>();
}
