using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;

public class AllergyConfiguration : IEntityTypeConfiguration<Allergy>
{
    public void Configure(EntityTypeBuilder<Allergy> builder)
    {
        ConfigureAllergyTable(builder);
    }


    private void ConfigureAllergyTable(EntityTypeBuilder<Allergy> builder) 
    {
        builder.ToTable("Allergies");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Class).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Type).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Group).IsRequired().HasMaxLength(100);
        builder.Property(t => t.Food).IsRequired().HasMaxLength(100);


    }
}
