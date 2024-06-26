﻿using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class CoachConfiguration : IEntityTypeConfiguration<Coach>
{
    public void Configure(EntityTypeBuilder<Coach> builder)
    {
        ConfigureCoachTable(builder);
    }

    private void ConfigureCoachTable(EntityTypeBuilder<Coach> builder)
    {
        builder.ToTable("Coaches");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CVFileName).IsRequired();
        builder.Property(x => x.RecomendationText).IsRequired();
        builder.Property(t => t.IsVerified).HasDefaultValue(false);
    }
} 
