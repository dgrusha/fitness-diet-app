using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.DTO;
public class CoachDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Mail { get; set; } 
    public string RecomendationText { get; set; }
    public string CVFileName { get; set; }
    public string AvatarFileName { get; set; }

}
