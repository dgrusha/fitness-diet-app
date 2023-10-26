using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using MediatR;
using FitnessApp.Application.Common.Helpers;
using FitnessApp.Application.Common.Chat;

namespace FitnessApp.Application;

public static class DependencyInjection 
{
    public static IServiceCollection AddApplication(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddMediatR(typeof(DependencyInjection).Assembly);
        serviceCollection.AddSingleton<IHashing, Hashing>();
        serviceCollection.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());

        return serviceCollection;
    }
}
