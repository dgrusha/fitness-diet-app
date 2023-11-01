using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class Rating
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int RatingLevel { get; set; }
    public string Text { get; set; }
    public DateTime TimeSent { get; set; } = DateTime.Now;
    public Guid UserId { get; set; }
    public User User { get; set; }
}
