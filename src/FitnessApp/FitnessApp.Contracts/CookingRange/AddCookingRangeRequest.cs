using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.CookingRange;
public record AddCookingRangeRequest
(
    string Name,
    int MinuteStart,
    int MinuteEnd
);
