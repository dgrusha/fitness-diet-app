using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class TrainingModeConfiguration : IEntityTypeConfiguration<TrainingMode>
{
    public void Configure(EntityTypeBuilder<TrainingMode> builder)
    {
        ConfigureTrainingModeTable(builder);
    }

    private void ConfigureTrainingModeTable(EntityTypeBuilder<TrainingMode> builder)
    {
        builder.ToTable("TrainingModes");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);
    }
}
