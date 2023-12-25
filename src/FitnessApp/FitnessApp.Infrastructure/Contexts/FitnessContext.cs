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
    public DbSet<Rating> Ratings { get; set; } = null!;
    public DbSet<ActivityMode> ActivityModes { get; set; } = null!;
    public DbSet<CookingRange> CookingRanges { get; set; } = null!;
    public DbSet<DietForm> DietForms { get; set; } = null!;
    public DbSet<DietMode> DietModes { get; set; } = null!;
    public DbSet<Recipe> Recipes { get; set; } = null!;
    public DbSet<RecipeInstruction> RecipeInstructions { get; set; } = null!;
    public DbSet<PasswordResetHolder> PasswordResetHolders { get; set; } = null!;
    public DbSet<TrainingForm> TrainingForms { get; set; } = null!;
    public DbSet<TrainingMode> TrainingModes { get; set; } = null!;
    public DbSet<Excercise> Excercises { get; set; } = null!;

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
        modelBuilder.ApplyConfiguration(new RatingConfiguration());
        modelBuilder.ApplyConfiguration(new ActivityModeConfiguration());
        modelBuilder.ApplyConfiguration(new CookingRangeConfiguration());
        modelBuilder.ApplyConfiguration(new DietModeConfiguration());
        modelBuilder.ApplyConfiguration(new DietFormConfiguration());
        modelBuilder.ApplyConfiguration(new RecipeConfiguration());
        modelBuilder.ApplyConfiguration(new RecipeInstructionConfiguration());
        modelBuilder.ApplyConfiguration(new PasswordResetHolderConfiguration());
        modelBuilder.ApplyConfiguration(new TrainingModeConfiguration());
        modelBuilder.ApplyConfiguration(new TrainingFormConfiguration());
        modelBuilder.ApplyConfiguration(new ExcerciseConfiguration());
    }

}