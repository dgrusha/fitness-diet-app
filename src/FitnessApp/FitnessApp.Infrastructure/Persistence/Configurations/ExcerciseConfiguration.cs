using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class ExcerciseConfiguration : IEntityTypeConfiguration<Excercise>
{
    public void Configure(EntityTypeBuilder<Excercise> builder)
    {
        ConfigureExcerciseTable(builder);
    }

    private void ConfigureExcerciseTable(EntityTypeBuilder<Excercise> builder)
    {
        builder.ToTable("Excercises");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Muscle).IsRequired();
        builder.Property(t => t.Part).IsRequired();
        builder.Property(t => t.Instructions).IsRequired();
        builder.Property(t => t.Difficulty).IsRequired();
        builder.Property(t => t.Day).IsRequired();
        builder.Property(t => t.Comment);
        builder.Property(t => t.FileName);
    }
}
