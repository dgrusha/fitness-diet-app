using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;

public interface ISubscriptionRepository
{
    IEnumerable<Subscription>? GetSubscriptionsOfClients(Guid coachId);
    void Add(Subscription subscription);
    void UpdateCoach(Subscription subscription, Guid coachId);
    void Delete(Guid clientId);
    Subscription? GetSubscriptionForCoach(Guid clientId);
}
