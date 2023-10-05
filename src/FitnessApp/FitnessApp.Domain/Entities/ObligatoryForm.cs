using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class ObligatoryForm
{
    public int Height { get; set; }
    public int Weight { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }

    //public List<FormAllergy> FormAllergies { get; set; } = new List<FormAllergy>();
}
