using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Authentication;
using FitnessApp.Application.Common.Interfaces.Services;
using FitnessApp.Infrastructure.Authentication;
using FitnessApp.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FitnessApp.Infrastructure;

public static class DependencyInjection 
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection serviceCollection,
        ConfigurationManager configuration
        )
    {
        serviceCollection.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        serviceCollection.AddSingleton<ITokenGenerator,TokenGenerator>();
        serviceCollection.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        return serviceCollection;
    }
}
