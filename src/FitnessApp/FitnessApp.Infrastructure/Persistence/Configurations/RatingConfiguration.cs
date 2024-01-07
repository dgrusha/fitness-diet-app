using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class RatingConfiguration : IEntityTypeConfiguration<Rating>
{
    public void Configure(EntityTypeBuilder<Rating> builder)
    {
        ConfigureRatingTable(builder);
    }

    private void ConfigureRatingTable(EntityTypeBuilder<Rating> builder)
    {
        builder.ToTable("Ratings");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.RatingLevel).IsRequired();
        builder.Property(t => t.Text).IsRequired();

        // Relations
        builder.HasOne(r => r.User)
           .WithMany(u => u.Ratings)
           .HasForeignKey(r => r.UserId)
           .OnDelete(DeleteBehavior.Cascade);
    }
}
