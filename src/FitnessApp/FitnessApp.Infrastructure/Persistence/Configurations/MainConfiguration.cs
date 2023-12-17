using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;

public class MainConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        ConfigureUserTable(builder);
    }

    private void ConfigureUserTable(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.FirstName).HasMaxLength(100);
        builder.Property(t => t.LastName).HasMaxLength(100);
        builder.Property(t => t.Email).HasMaxLength(100);
        builder.Property(t => t.Password).HasMaxLength(100);
        builder.Property(t => t.AvatarFileName).IsRequired(false);
        builder.Property(t => t.HasObligatoryForm).IsRequired();
        builder.Property(t=> t.IsAdmin).HasDefaultValue(false);

        // Statuses 
        builder.Property(t => t.DietStatus).IsRequired();
        builder.Property(t => t.TrainingStatus).IsRequired();

        // Relations
        builder.HasOne(u => u.ObligatoryForm)
            .WithOne(of => of.User!)
            .HasForeignKey<ObligatoryForm>(of => of.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(u => u.DietForm)
            .WithOne(of => of.User!)
            .HasForeignKey<DietForm>(of => of.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(u => u.Coach)
            .WithOne(c => c.User!)
            .HasForeignKey<Coach>(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }

}
