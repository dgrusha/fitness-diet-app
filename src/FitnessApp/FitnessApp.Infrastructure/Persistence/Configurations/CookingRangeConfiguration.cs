using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class CookingRangeConfiguration : IEntityTypeConfiguration<CookingRange>
{
    public void Configure(EntityTypeBuilder<CookingRange> builder)
    {
        ConfigureCookingRangeTable(builder);
    }

    private void ConfigureCookingRangeTable(EntityTypeBuilder<CookingRange> builder)
    {
        builder.ToTable("CookingRanges");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);
        builder.Property(t => t.MinuteStart).IsRequired();
        builder.Property(t => t.MinuteEnd).IsRequired();
    }
}
