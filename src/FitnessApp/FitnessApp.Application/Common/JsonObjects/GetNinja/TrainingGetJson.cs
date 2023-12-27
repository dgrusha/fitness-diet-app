using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.JsonObjects.GetNinja;
public class ExerciseJson
{
    public string name { get; set; }
    public string type { get; set; }
    public string muscle { get; set; }
    public string equipment { get; set; }
    public string difficulty { get; set; }
    public string instructions { get; set; }
}
