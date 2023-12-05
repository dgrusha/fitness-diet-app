using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class SubscriptionRepository : ISubscriptionRepository
{
    private readonly FitnessContext _subscriptionContext;

    public SubscriptionRepository(FitnessContext subscriptionContext) 
    { 
        _subscriptionContext = subscriptionContext;
    }

    public void Add(Subscription subscription)
    {
        _subscriptionContext.Subscriptions.Add(subscription);
        _subscriptionContext.SaveChanges();
    }

    public void Delete(Subscription subscription)
    {
        _subscriptionContext.Subscriptions.Remove(subscription);
        _subscriptionContext.SaveChanges();
    }

    public HashSet<Subscription>? GetSubscriptions()
    {
        return _subscriptionContext.Subscriptions.ToHashSet();
    }

    public void Update(Subscription subscription)
    {
        throw new NotImplementedException();
    }
}
