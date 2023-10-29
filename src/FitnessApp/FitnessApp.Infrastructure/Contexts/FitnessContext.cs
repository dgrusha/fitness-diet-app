using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace FitnessApp.Infrastructure.Contexts;
public class FitnessContext : DbContext
{

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Allergy> Allergies { get; set; } = null!;
    public DbSet<ObligatoryForm> ObligatoryForms { get; set; } = null!;
    public DbSet<Conversation> Conversations { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;
    public DbSet<Coach> Coaches { get; set; } = null!;

    public FitnessContext(DbContextOptions<FitnessContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new MainConfiguration());
        modelBuilder.ApplyConfiguration(new AllergyConfiguration());
        modelBuilder.ApplyConfiguration(new ObligatoryFormConfiguration());
        modelBuilder.ApplyConfiguration(new ConversationConfiguration());
        modelBuilder.ApplyConfiguration(new MessageConfiguration());
        modelBuilder.ApplyConfiguration(new CoachConfiguration());
    }

}