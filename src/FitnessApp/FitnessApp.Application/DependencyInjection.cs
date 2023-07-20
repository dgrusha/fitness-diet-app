using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Services.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace FitnessApp.Application;

public static class DependencyInjection 
{
    public static IServiceCollection AddApplication(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IAuthenticationService, AuthenticationService>();

        return serviceCollection;
    }
}
