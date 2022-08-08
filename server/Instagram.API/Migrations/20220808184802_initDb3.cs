using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Instagram.API.Migrations
{
    public partial class initDb3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CommentBy",
                table: "Comments",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentBy",
                table: "Comments");
        }
    }
}
