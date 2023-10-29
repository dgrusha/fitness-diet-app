using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class MessageRepository : IMessageRepository
{

    private readonly FitnessContext _messageContext;

    public MessageRepository(FitnessContext messageContext)
    {
        _messageContext = messageContext;
    }

    public void Add(Message message)
    {
        _messageContext.Add(message);
        _messageContext.SaveChanges();
    }

    public List<MessageDto> GetMessagesFromConversation(string id)
    {
        return _messageContext.Messages
            .Where(m => m.ConversationId == id)
            .Select(m => new MessageDto 
            {
                Text = m.Text,
                Email = m.Sender.Email,
                TimeSent = m.TimeSent
            })
            .ToList();
    }
}