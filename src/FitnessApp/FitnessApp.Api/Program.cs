using System.Text;
using FitnessApp.Api.Filters;
using FitnessApp.Application;
using FitnessApp.Application.Common.Chat;
using FitnessApp.Application.Common.HangfireTasks;
using FitnessApp.Infrastructure;
using Hangfire;
using NLog;

//LogManager.Setup().LoadConfigurationFromFile(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
var FitnessAllowSpecificOrigins = "_fitnessAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services.AddApplication(builder.Configuration);
    builder.Services.AddSignalR();
    builder.Services.AddInfrastructure(builder.Configuration);
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: FitnessAllowSpecificOrigins,
                          policy =>
                          {
                              policy.WithOrigins("http://localhost:3000", "https://eatrain.vercel.app")
                              .AllowAnyHeader()
                              .AllowCredentials()
                              .AllowAnyMethod();
                          });
    });
    builder.Services.AddControllers(
            options => options.Filters.Add<ErrorHandle>()
        );
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}



var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    app.UseHangfireDashboard("/hangfire");
    app.UseHttpsRedirection();

    app.UseCors(FitnessAllowSpecificOrigins);

    app.UseAuthentication();
    app.UseAuthorization();
    app.MapHub<ChatHub>("/chat");
    app.Services.AddHangfireTasks();
    app.MapControllers();
    
    app.Run();
}


