using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class DietModeConfiguration : IEntityTypeConfiguration<DietMode>
{
    public void Configure(EntityTypeBuilder<DietMode> builder)
    {
        ConfigureDietModeTable(builder);
    }

    private void ConfigureDietModeTable(EntityTypeBuilder<DietMode> builder)
    {
        builder.ToTable("DietModes");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Coeficient).IsRequired();
    }
}
