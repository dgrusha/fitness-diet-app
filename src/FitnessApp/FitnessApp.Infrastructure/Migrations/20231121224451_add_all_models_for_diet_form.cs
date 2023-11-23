using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class add_all_models_for_diet_form : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityModes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Coeficient = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityModes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CookingRanges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MinuteStart = table.Column<int>(type: "int", nullable: false),
                    MinuteEnd = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CookingRanges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DietModes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Coeficient = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DietModes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DietForms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DietModeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityModeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CookingRangeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DietForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DietForms_ActivityModes_ActivityModeId",
                        column: x => x.ActivityModeId,
                        principalTable: "ActivityModes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DietForms_CookingRanges_CookingRangeId",
                        column: x => x.CookingRangeId,
                        principalTable: "CookingRanges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DietForms_DietModes_DietModeId",
                        column: x => x.DietModeId,
                        principalTable: "DietModes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DietForms_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DietForms_ActivityModeId",
                table: "DietForms",
                column: "ActivityModeId");

            migrationBuilder.CreateIndex(
                name: "IX_DietForms_CookingRangeId",
                table: "DietForms",
                column: "CookingRangeId");

            migrationBuilder.CreateIndex(
                name: "IX_DietForms_DietModeId",
                table: "DietForms",
                column: "DietModeId");

            migrationBuilder.CreateIndex(
                name: "IX_DietForms_UserId",
                table: "DietForms",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DietForms");

            migrationBuilder.DropTable(
                name: "ActivityModes");

            migrationBuilder.DropTable(
                name: "CookingRanges");

            migrationBuilder.DropTable(
                name: "DietModes");
        }
    }
}
