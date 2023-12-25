using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;

public interface ISubscriptionRepository
{
    HashSet<Subscription>? GetSubscriptions();
    void Add(Subscription subscription);
    void Update(Subscription subscription);
    void Delete(Guid clientId);
    public Subscription? GetSubscription(Guid clientId);

}
