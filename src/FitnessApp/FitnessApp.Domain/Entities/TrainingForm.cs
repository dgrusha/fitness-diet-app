using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class TrainingForm
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; }
    public Guid TrainingModeId { get; set; }
    public TrainingMode TrainingMode { get; set; }
    public List<string> Days { get; set; } = new List<string>();
    public bool GenerateFile { get; set; } = false;
    public List<Excercise> Excercises { get; set; } = new List<Excercise>();
}
