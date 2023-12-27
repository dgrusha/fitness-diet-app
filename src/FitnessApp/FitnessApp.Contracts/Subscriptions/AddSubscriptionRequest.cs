using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.Subscriptions;

public record AddSubscriptionRequest
(
    string CoachEmail,
    int Duration
);
