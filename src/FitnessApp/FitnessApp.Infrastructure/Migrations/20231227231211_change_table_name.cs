using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class change_table_name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Excercises_TrainingtForms_TrainingFormId",
                table: "Excercises");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingtForms_TrainingModes_TrainingModeId",
                table: "TrainingtForms");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingtForms_Users_UserId",
                table: "TrainingtForms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingtForms",
                table: "TrainingtForms");

            migrationBuilder.RenameTable(
                name: "TrainingtForms",
                newName: "TrainingForms");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingtForms_UserId",
                table: "TrainingForms",
                newName: "IX_TrainingForms_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingtForms_TrainingModeId",
                table: "TrainingForms",
                newName: "IX_TrainingForms_TrainingModeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingForms",
                table: "TrainingForms",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Excercises_TrainingForms_TrainingFormId",
                table: "Excercises",
                column: "TrainingFormId",
                principalTable: "TrainingForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingForms_TrainingModes_TrainingModeId",
                table: "TrainingForms",
                column: "TrainingModeId",
                principalTable: "TrainingModes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingForms_Users_UserId",
                table: "TrainingForms",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Excercises_TrainingForms_TrainingFormId",
                table: "Excercises");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingForms_TrainingModes_TrainingModeId",
                table: "TrainingForms");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingForms_Users_UserId",
                table: "TrainingForms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainingForms",
                table: "TrainingForms");

            migrationBuilder.RenameTable(
                name: "TrainingForms",
                newName: "TrainingtForms");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingForms_UserId",
                table: "TrainingtForms",
                newName: "IX_TrainingtForms_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingForms_TrainingModeId",
                table: "TrainingtForms",
                newName: "IX_TrainingtForms_TrainingModeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainingtForms",
                table: "TrainingtForms",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Excercises_TrainingtForms_TrainingFormId",
                table: "Excercises",
                column: "TrainingFormId",
                principalTable: "TrainingtForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingtForms_TrainingModes_TrainingModeId",
                table: "TrainingtForms",
                column: "TrainingModeId",
                principalTable: "TrainingModes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingtForms_Users_UserId",
                table: "TrainingtForms",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
