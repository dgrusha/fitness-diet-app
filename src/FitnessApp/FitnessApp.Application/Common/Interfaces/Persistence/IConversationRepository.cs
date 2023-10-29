using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IConversationRepository
{

    public void Add(Conversation conversation);
    public Conversation? GetById(string id);

}
