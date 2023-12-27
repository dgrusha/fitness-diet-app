using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class ObligatoryFormConfiguration : IEntityTypeConfiguration<ObligatoryForm>
{
    public void Configure(EntityTypeBuilder<ObligatoryForm> builder)
    {
        ConfigureObligatoryFormTable(builder);
    }


    private void ConfigureObligatoryFormTable(EntityTypeBuilder<ObligatoryForm> builder)
    {
        builder.ToTable("ObligatoryForms");
        builder.HasKey(t => t.UserId);
        builder.Property(t => t.Height);
        builder.Property(t => t.Weight);
        builder.Property(t => t.Years);
        builder.Property(t => t.Gender);

        // Relations
        builder.HasMany(f => f.Allergies)
           .WithMany(a => a.ObligatoryForms)
           .UsingEntity(j => j.ToTable("ObligatoryFormAllergies"));

    }
}
