using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class ActivityModeConfiguration : IEntityTypeConfiguration<ActivityMode>
{
    public void Configure(EntityTypeBuilder<ActivityMode> builder)
    {
        ConfigureActivityModeTable(builder);
    }

    private void ConfigureActivityModeTable(EntityTypeBuilder<ActivityMode> builder)
    {
        builder.ToTable("ActivityModes");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Coeficient).IsRequired();
    }
}
