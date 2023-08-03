using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Services.Authentication.Commands;
using FitnessApp.Application.Services.Authentication.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace FitnessApp.Application;

public static class DependencyInjection 
{
    public static IServiceCollection AddApplication(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IAuthenticationQueryService, AuthenticationQueryService>();
        serviceCollection.AddScoped<IAuthenticationCommandService, AuthenticationCommandService>();

        return serviceCollection;
    }
}
