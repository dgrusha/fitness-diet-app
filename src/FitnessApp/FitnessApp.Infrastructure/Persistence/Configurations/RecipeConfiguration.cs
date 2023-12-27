using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        ConfigureRecipeTable(builder);
    }

    private void ConfigureRecipeTable(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable("Recipes");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.DayOfTheWeek).IsRequired();
        builder.Property(t => t.DishType).IsRequired();
        builder.Property(t => t.Name).IsRequired();
        builder.Property(t => t.Description).IsRequired();
        builder.Property(t => t.Comment);
        builder.Property(t => t.Calories).IsRequired();
        builder.Property(t => t.Carbohydrate).IsRequired();
        builder.Property(t => t.Fat).IsRequired();
        builder.Property(t => t.Protein).IsRequired();
        builder.Property(t => t.Cholesterol).IsRequired();
        builder.Property(t => t.Iron).IsRequired();
        builder.Property(t => t.Sugar).IsRequired();
        builder.Property(t => t.TransFat).IsRequired();

        builder.Property(r => r.Ingredients)
                .HasConversion(
                    v => string.Join("////", v),
                    v => v.Split("////", StringSplitOptions.RemoveEmptyEntries).ToList()
                );

        builder.HasMany(m => m.Instructions)
            .WithOne(c => c.Recipe)
            .HasForeignKey(m => m.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
