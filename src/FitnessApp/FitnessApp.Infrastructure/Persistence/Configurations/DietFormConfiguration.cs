using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;

public class DietFormConfiguration : IEntityTypeConfiguration<DietForm>
{
    public void Configure(EntityTypeBuilder<DietForm> builder)
    {
        ConfigureDietFormTable(builder);
    }

    private void ConfigureDietFormTable(EntityTypeBuilder<DietForm> builder)
    {
        builder.ToTable("DietForms");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.GenerateFile).IsRequired();

        builder.HasOne(m => m.DietMode)
            .WithMany(c => c.DietForms)
            .HasForeignKey(m => m.DietModeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(m => m.ActivityMode)
            .WithMany(c => c.DietForms)
            .HasForeignKey(m => m.ActivityModeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(m => m.CookingRange)
            .WithMany(c => c.DietForms)
            .HasForeignKey(m => m.CookingRangeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(m => m.Recipes)
            .WithOne(c => c.DietForm)
            .HasForeignKey(m => m.DietFormId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}