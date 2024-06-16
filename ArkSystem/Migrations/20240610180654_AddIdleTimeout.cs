using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArkSystem.Migrations
{
    public partial class AddIdleTimeout : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Users",
                newName: "IdleTimeout");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdleTimeout",
                table: "Users",
                newName: "CreatedAt");
        }
    }
}
