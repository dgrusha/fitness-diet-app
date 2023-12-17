using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp.Infrastructure.Persistence.Configurations;
internal class RecipeInstructionConfiguration : IEntityTypeConfiguration<RecipeInstruction>
{
    public void Configure(EntityTypeBuilder<RecipeInstruction> builder)
    {
        ConfigureRecipeInstructionTable(builder);
    }

    private void ConfigureRecipeInstructionTable(EntityTypeBuilder<RecipeInstruction> builder)
    {
        builder.ToTable("RecipeInstructions");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Order).IsRequired();
        builder.Property(r => r.Instruction).IsRequired();

    }
}
