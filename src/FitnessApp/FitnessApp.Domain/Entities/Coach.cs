using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class Coach
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string RecomendationText { get; set; }
    public string CVFileName { get; set; }
    public bool IsVerified { get; set; } = false;

    public Guid UserId { get; set; }
    public User User { get; set; }

    public ICollection<Subscription> Subscribers { get; set; } = new List<Subscription>();

}
