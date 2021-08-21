using Microsoft.EntityFrameworkCore.Migrations;

namespace Dal.Migrations
{
    public partial class AddIsGoogleUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsGoogleUser",
                table: "AspNetUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGoogleUser",
                table: "AspNetUsers");
        }
    }
}
