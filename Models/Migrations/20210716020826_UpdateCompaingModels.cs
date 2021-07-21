using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Dal.Migrations
{
    public partial class UpdateCompaingModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ADCompaingCompaingGroup");

            migrationBuilder.RenameColumn(
                name: "Keyword",
                table: "KeyWords",
                newName: "KeywordGroupName");

            migrationBuilder.AddColumn<List<string>>(
                name: "KeyWords",
                table: "KeyWords",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KeywordMatchType",
                table: "KeyWords",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AplicationUserId",
                table: "Compaings",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Compaings",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CompaingId",
                table: "CompaingGroups",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "CallOnlyAd",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Country = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    HeadlineOne = table.Column<string>(type: "text", nullable: true),
                    HeadlineTwo = table.Column<string>(type: "text", nullable: true),
                    DescriptionOne = table.Column<string>(type: "text", nullable: true),
                    DescriptionTwo = table.Column<string>(type: "text", nullable: true),
                    BusinessName = table.Column<string>(type: "text", nullable: true),
                    VerificationURL = table.Column<string>(type: "text", nullable: true),
                    FinalUrl = table.Column<string>(type: "text", nullable: true),
                    CompaingGroupId = table.Column<int>(type: "integer", nullable: false),
                    AdGroupName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CallOnlyAd", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CallOnlyAd_CompaingGroups_CompaingGroupId",
                        column: x => x.CompaingGroupId,
                        principalTable: "CompaingGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExpTxtAd",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HeadlineOne = table.Column<string>(type: "text", nullable: true),
                    HeadlineTwo = table.Column<string>(type: "text", nullable: true),
                    HeadlineThree = table.Column<string>(type: "text", nullable: true),
                    DescriptionOne = table.Column<string>(type: "text", nullable: true),
                    DescriptionTwo = table.Column<string>(type: "text", nullable: true),
                    FinalURL = table.Column<string>(type: "text", nullable: true),
                    PathOne = table.Column<string>(type: "text", nullable: true),
                    PathTwo = table.Column<string>(type: "text", nullable: true),
                    AdGroupName = table.Column<string>(type: "text", nullable: true),
                    CompaingGroupId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpTxtAd", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpTxtAd_CompaingGroups_CompaingGroupId",
                        column: x => x.CompaingGroupId,
                        principalTable: "CompaingGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RespSearchAd",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DescriptionOne = table.Column<string>(type: "text", nullable: true),
                    DescriptionTwo = table.Column<string>(type: "text", nullable: true),
                    DescriptionThree = table.Column<string>(type: "text", nullable: true),
                    DescriptionFour = table.Column<string>(type: "text", nullable: true),
                    FinalURL = table.Column<string>(type: "text", nullable: true),
                    PathOne = table.Column<string>(type: "text", nullable: true),
                    PathTwo = table.Column<string>(type: "text", nullable: true),
                    AdGroupName = table.Column<string>(type: "text", nullable: true),
                    HeadLines = table.Column<List<string>>(type: "text[]", nullable: true),
                    CompaingGroupId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespSearchAd", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RespSearchAd_CompaingGroups_CompaingGroupId",
                        column: x => x.CompaingGroupId,
                        principalTable: "CompaingGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Compaings_AplicationUserId",
                table: "Compaings",
                column: "AplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CompaingGroups_CompaingId",
                table: "CompaingGroups",
                column: "CompaingId");

            migrationBuilder.CreateIndex(
                name: "IX_CallOnlyAd_CompaingGroupId",
                table: "CallOnlyAd",
                column: "CompaingGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpTxtAd_CompaingGroupId",
                table: "ExpTxtAd",
                column: "CompaingGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_RespSearchAd_CompaingGroupId",
                table: "RespSearchAd",
                column: "CompaingGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_CompaingGroups_Compaings_CompaingId",
                table: "CompaingGroups",
                column: "CompaingId",
                principalTable: "Compaings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Compaings_AspNetUsers_AplicationUserId",
                table: "Compaings",
                column: "AplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompaingGroups_Compaings_CompaingId",
                table: "CompaingGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_Compaings_AspNetUsers_AplicationUserId",
                table: "Compaings");

            migrationBuilder.DropTable(
                name: "CallOnlyAd");

            migrationBuilder.DropTable(
                name: "ExpTxtAd");

            migrationBuilder.DropTable(
                name: "RespSearchAd");

            migrationBuilder.DropIndex(
                name: "IX_Compaings_AplicationUserId",
                table: "Compaings");

            migrationBuilder.DropIndex(
                name: "IX_CompaingGroups_CompaingId",
                table: "CompaingGroups");

            migrationBuilder.DropColumn(
                name: "KeyWords",
                table: "KeyWords");

            migrationBuilder.DropColumn(
                name: "KeywordMatchType",
                table: "KeyWords");

            migrationBuilder.DropColumn(
                name: "AplicationUserId",
                table: "Compaings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Compaings");

            migrationBuilder.RenameColumn(
                name: "KeywordGroupName",
                table: "KeyWords",
                newName: "Keyword");

            migrationBuilder.AlterColumn<int>(
                name: "CompaingId",
                table: "CompaingGroups",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ADCompaingCompaingGroup",
                columns: table => new
                {
                    CompaingGroupsId = table.Column<int>(type: "integer", nullable: false),
                    CompaingsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ADCompaingCompaingGroup", x => new { x.CompaingGroupsId, x.CompaingsId });
                    table.ForeignKey(
                        name: "FK_ADCompaingCompaingGroup_CompaingGroups_CompaingGroupsId",
                        column: x => x.CompaingGroupsId,
                        principalTable: "CompaingGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ADCompaingCompaingGroup_Compaings_CompaingsId",
                        column: x => x.CompaingsId,
                        principalTable: "Compaings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ADCompaingCompaingGroup_CompaingsId",
                table: "ADCompaingCompaingGroup",
                column: "CompaingsId");
        }
    }
}
