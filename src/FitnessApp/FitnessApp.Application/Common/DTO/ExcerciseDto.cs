using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.DTO;
public class ExcerciseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Muscle { get; set; }
    public string Part { get; set; }
    public string Instructions { get; set; }
    public string Difficulty { get; set; }
    public int Day { get; set; }
    public string? Comment { get; set; }
    public string? FileName { get; set; }
}
