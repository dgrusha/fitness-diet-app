using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.DTO;

public class AllDaysData
{
    public Dictionary<int, Dictionary<int, Dictionary<string, List<string>>>> DayData { get; set; }
}