using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class add_many_to_many_form_allergy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ObligatoryFormAllergies",
                columns: table => new
                {
                    AllergiesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ObligatoryFormsUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObligatoryFormAllergies", x => new { x.AllergiesId, x.ObligatoryFormsUserId });
                    table.ForeignKey(
                        name: "FK_ObligatoryFormAllergies_Allergies_AllergiesId",
                        column: x => x.AllergiesId,
                        principalTable: "Allergies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ObligatoryFormAllergies_ObligatoryForms_ObligatoryFormsUserId",
                        column: x => x.ObligatoryFormsUserId,
                        principalTable: "ObligatoryForms",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ObligatoryFormAllergies_ObligatoryFormsUserId",
                table: "ObligatoryFormAllergies",
                column: "ObligatoryFormsUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ObligatoryFormAllergies");
        }
    }
}
