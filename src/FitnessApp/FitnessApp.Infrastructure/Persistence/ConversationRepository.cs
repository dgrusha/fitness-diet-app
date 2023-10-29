using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class ConversationRepository : IConversationRepository
{

    private readonly FitnessContext _conversationContext;

    public ConversationRepository(FitnessContext conversationContext)
    {
        _conversationContext = conversationContext;
    }

    public void Add(Conversation conversation)
    {
        _conversationContext.Conversations.Add(conversation);
        _conversationContext.SaveChanges();
    }

    public Conversation? GetById(string id)
    {
        return _conversationContext.Conversations.SingleOrDefault(c => c.Id == id);
    }
}
