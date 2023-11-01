using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.DTO;
public class MessageDto
{
    public string Text { get; set; }
    public string Email { get; set; }
    public DateTime TimeSent { get; set; }
}
