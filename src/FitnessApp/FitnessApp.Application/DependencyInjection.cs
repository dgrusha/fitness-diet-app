using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using MediatR;
using FitnessApp.Application.Common.Helpers;
using FitnessApp.Application.Common.Chat;
using Microsoft.Extensions.Configuration;
using Hangfire;
using FitnessApp.Application.Common.HangfireTasks;
using FitnessApp.Application.Common.FatSecret;

namespace FitnessApp.Application;

public static class DependencyInjection 
{
    public static IServiceCollection AddApplication(
        this IServiceCollection serviceCollection,
        ConfigurationManager configuration)
    {
        serviceCollection.AddMediatR(typeof(DependencyInjection).Assembly);
        serviceCollection.AddSingleton<IHashing, Hashing>();
        serviceCollection.AddSingleton<IFatSecretApi, FatSecretApi>();
        serviceCollection.AddSingleton<IDictionary<string, UserConnectionInner>>(opts => new Dictionary<string, UserConnectionInner>());
        serviceCollection.AddScoped<HangfireService>();
        serviceCollection.AddHttpClient<FatSecretApi>();

        string connectionString = configuration.GetConnectionString("SqlServerConnection");
        serviceCollection.AddHangfire(config =>
        {
            config.UseSqlServerStorage(connectionString);
        });

        serviceCollection.AddHangfireServer();

        return serviceCollection;
    }

    public static void AddHangfireTasks(this IServiceProvider serviceProvider)
    {
        using (var scope = serviceProvider.CreateScope())
        {
            var hangfireService = scope.ServiceProvider.GetRequiredService<HangfireService>();

            RecurringJob.AddOrUpdate<HangfireService>("formEditUpdate", x => hangfireService.UpdateDietFormsEachMinute(), Cron.MinuteInterval(1));
        }
    }
}
