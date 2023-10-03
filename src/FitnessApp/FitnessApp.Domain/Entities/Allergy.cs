using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class Allergy
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }

    public string Class { get; set; }

    public string Type { get; set; }

    public string Group { get; set; }

    public string Food { get; set; }

}
