using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;

public class MainConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        ConfigureUserTable(builder);
    }

    private void ConfigureUserTable(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.FirstName).HasMaxLength(100);
        builder.Property(t => t.LastName).HasMaxLength(100);
        builder.Property(t => t.Email).HasMaxLength(100);
        builder.Property(t => t.Password).HasMaxLength(100);
        builder.Property(t => t.HasObligatoryForm).IsRequired();

        // Relations
        builder.HasOne(u => u.ObligatoryForm)
            .WithOne(of => of.User!)
            .HasForeignKey<ObligatoryForm>(of => of.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }

}
