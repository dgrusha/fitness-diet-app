using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class add_recipes_to_diet_form : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DayOfTheWeek = table.Column<int>(type: "int", nullable: false),
                    DishType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Calories = table.Column<double>(type: "float", nullable: false),
                    Carbohydrate = table.Column<double>(type: "float", nullable: false),
                    Fat = table.Column<double>(type: "float", nullable: false),
                    Protein = table.Column<double>(type: "float", nullable: false),
                    DietFormId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ingredients = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recipes_DietForms_DietFormId",
                        column: x => x.DietFormId,
                        principalTable: "DietForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_DietFormId",
                table: "Recipes",
                column: "DietFormId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recipes");
        }
    }
}
