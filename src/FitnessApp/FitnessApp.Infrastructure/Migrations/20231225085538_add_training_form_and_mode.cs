using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class add_training_form_and_mode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrainingModes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingModes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrainingtForms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingModeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Days = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingtForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingtForms_TrainingModes_TrainingModeId",
                        column: x => x.TrainingModeId,
                        principalTable: "TrainingModes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainingtForms_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingtForms_TrainingModeId",
                table: "TrainingtForms",
                column: "TrainingModeId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingtForms_UserId",
                table: "TrainingtForms",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingtForms");

            migrationBuilder.DropTable(
                name: "TrainingModes");
        }
    }
}
