using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class TrainingFormConfiguration : IEntityTypeConfiguration<TrainingForm>
{
    public void Configure(EntityTypeBuilder<TrainingForm> builder)
    {
        ConfigureTrainingFormTable(builder);
    }

    private void ConfigureTrainingFormTable(EntityTypeBuilder<TrainingForm> builder)
    {
        builder.ToTable("TrainingtForms");
        builder.HasKey(t => t.Id);
        builder.Property(r => r.Days)
            .HasConversion(
                    v => string.Join("////", v),
                    v => v.Split("////", StringSplitOptions.RemoveEmptyEntries).ToList()
                );

        builder.HasOne(m => m.TrainingMode)
            .WithMany(c => c.TrainingForms)
            .HasForeignKey(m => m.TrainingModeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(m => m.Excercises)
            .WithOne(c => c.TrainingForm)
            .HasForeignKey(m => m.TrainingFormId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
