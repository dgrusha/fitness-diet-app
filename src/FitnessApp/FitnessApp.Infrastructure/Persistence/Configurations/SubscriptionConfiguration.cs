using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations
{
    public class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
    {
        public void Configure(EntityTypeBuilder<Subscription> builder)
        {
            ConfigureSubscriptionTable(builder);
        }

        private void ConfigureSubscriptionTable(EntityTypeBuilder<Subscription> builder)
        {
            builder.ToTable("Subscriptions");
            builder.HasKey(x => x.SubscriptionId);

            // Define foreign key relationship with Coach (nullable)
            builder
                .HasOne(s => s.Coach)
                .WithMany(c => c.Subscribers)
                .HasForeignKey(s => s.CoachId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Property(x => x.ClientId).IsRequired();
            builder.Property(x => x.CoachId);
            builder.Property(x => x.EndDate);
        }
    }
}
