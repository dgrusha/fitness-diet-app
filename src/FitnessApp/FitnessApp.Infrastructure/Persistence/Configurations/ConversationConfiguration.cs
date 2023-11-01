using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
{
    public void Configure(EntityTypeBuilder<Conversation> builder)
    {
        ConfigureConversationTable(builder);
    }

    private void ConfigureConversationTable(EntityTypeBuilder<Conversation> builder)
    {
        builder.ToTable("Conversations");
        builder.HasKey(c => c.Id);

        // Relations
        builder.HasOne(c => c.User1)
            .WithMany(u => u.Conversations1)
            .HasForeignKey(c => c.User1Id)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(c => c.User2)
            .WithMany(u => u.Conversations2)
            .HasForeignKey(c => c.User2Id)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
