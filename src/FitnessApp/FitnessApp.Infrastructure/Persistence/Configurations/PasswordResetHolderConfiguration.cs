using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class PasswordResetHolderConfiguration : IEntityTypeConfiguration<PasswordResetHolder>
{
    public void Configure(EntityTypeBuilder<PasswordResetHolder> builder)
    {
        ConfigurePasswordResetHolderTable(builder);
    }

    private void ConfigurePasswordResetHolderTable(EntityTypeBuilder<PasswordResetHolder> builder)
    {
        builder.ToTable("PasswordResetHolders");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Code).IsRequired();
        builder.Property(t => t.Active).IsRequired();
        builder.Property(t => t.ExpirationTime).IsRequired();

        // Relations
        builder.HasOne(r => r.User)
           .WithMany(u => u.PasswordCodes)
           .HasForeignKey(r => r.UserId)
           .OnDelete(DeleteBehavior.Cascade);
    }
}
