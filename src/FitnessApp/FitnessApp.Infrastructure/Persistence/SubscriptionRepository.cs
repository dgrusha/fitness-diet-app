using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

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

    public void Delete(Guid clientId)
    {
        Subscription subscription = _subscriptionContext.Subscriptions
            .Where(s => s.ClientId == clientId).Single();
        _subscriptionContext.Subscriptions.Remove(subscription);
        _subscriptionContext.SaveChanges();
    }

    public HashSet<Subscription>? GetSubscriptions()
    {
        return _subscriptionContext.Subscriptions.ToHashSet();
    }

    public Subscription? GetSubscription(Guid clientId)
    {
        return _subscriptionContext.Subscriptions
            .Include(u => u.Coach)
            .Where(m => m.ClientId.Equals(clientId))
            .SingleOrDefault();
    }

    public void UpdateCoach(Subscription subscription, Guid coachId)
    {
        subscription.CoachId = coachId;
        _subscriptionContext.SaveChanges();
    }
}
