using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class Excercise
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string Muscle { get; set; }
    public string Part { get; set; }
    public string Instructions { get; set; }
    public string Difficulty { get; set; }
    public int Day { get; set; }
    public string? Comment { get; set; }
    public string? FileName { get; set; }

    public Guid TrainingFormId { get; set; }
    public TrainingForm TrainingForm { get; set; }
}
