using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;

public class Subscription
{
    public Guid SubscriptionId { get; set; } = Guid.NewGuid();
    public DateTime EndDate { get; set; }
    public Guid ClientId { get; set; }
    public User Client { get; set; }
    public Guid? CoachId { get; set; } = null;
    public Coach? Coach { get; set; } = null;

}
