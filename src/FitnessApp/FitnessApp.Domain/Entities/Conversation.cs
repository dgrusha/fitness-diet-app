using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class Conversation
{
    public string Id { get; set; }

    public Guid User1Id { get; set; }
    public User User1 { get; set; }

    public Guid User2Id { get; set; }
    public User User2 { get; set; }

    public ICollection<Message> Messages { get; set; } = new List<Message>();

}
