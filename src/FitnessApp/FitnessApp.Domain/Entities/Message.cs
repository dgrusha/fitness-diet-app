using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class Message
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Text { get; set; }

    public Guid SenderId { get; set; }
    public User Sender { get; set; }
    public DateTime TimeSent { get; set; } = DateTime.Now;
    public string ConversationId { get; set; }
    public Conversation Conversation { get; set; }

}
