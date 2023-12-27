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
using FitnessApp.Infrastructure.Persistence;
using FitnessApp.Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;
using FitnessApp.Infrastructure.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Amazon.S3;

namespace FitnessApp.Infrastructure;

public static class DependencyInjection 
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection serviceCollection,
        ConfigurationManager configuration
        )
    {
        serviceCollection.AddAuthenticationCustom(configuration);
        serviceCollection.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        serviceCollection.AddDefaultAWSOptions(configuration.GetAWSOptions());
        serviceCollection.AddAWSService<IAmazonS3>();

        serviceCollection.AddScoped<IUserRepository, UserRepository>();
        serviceCollection.AddScoped<IAllergyRepository, AllergyRepository>();
        serviceCollection.AddScoped<IObligatoryFormRepository, ObligatoryFormRepository>();
        serviceCollection.AddScoped<IConversationRepository, ConversationRepository>();
        serviceCollection.AddScoped<IMessageRepository, MessageRepository>();
        serviceCollection.AddScoped<ICoachRepository, CoachRepository>();
        serviceCollection.AddScoped<IRatingRepository, RatingRepository>();
        serviceCollection.AddScoped<ISubscriptionRepository, SubscriptionRepository>();
        serviceCollection.AddScoped<IActivityModeRepository, ActivityModeRepository>();
        serviceCollection.AddScoped<ICookingRangeRepository, CookingRangeRepository>();
        serviceCollection.AddScoped<IDietFormRepository, DietFormRepository>();
        serviceCollection.AddScoped<IDietModeRepository, DietModeRepository>();
        serviceCollection.AddScoped<IRecipeRepository, RecipeRepository>();
        serviceCollection.AddScoped<IRecipeInstructionRepository, RecipeInstructionRepository>();
        serviceCollection.AddScoped<IResetPasswordHandlerRepository, ResetPasswordHandlerRepository>();

        string connectionString = configuration.GetConnectionString("SqlServerConnection");
        serviceCollection.AddDbContext<FitnessContext>(options =>
                options.UseSqlServer(connectionString));

        string connectionStringRedis = configuration.GetConnectionString("RedisConnection");
        serviceCollection.AddDistributedRedisCache(options =>
        {
            options.Configuration = connectionStringRedis;
            options.InstanceName = "FitnessApp_";
        });

        return serviceCollection;
    }

    public static IServiceCollection AddAuthenticationCustom(
        this IServiceCollection serviceCollection,
        ConfigurationManager configuration
        )
    {
        var jwtSettings = new JwtSettings();
        configuration.Bind(JwtSettings.SectionName, jwtSettings);

        serviceCollection.AddSingleton(Options.Create(jwtSettings));
        serviceCollection.AddSingleton<ITokenGenerator, TokenGenerator>();
        serviceCollection.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => 
            options.TokenValidationParameters = new TokenValidationParameters 
            {
                ValidateIssuer = true, 
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
            }
            );

        return serviceCollection;
    }
}
