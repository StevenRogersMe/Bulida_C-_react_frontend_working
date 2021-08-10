using Core.Compaings;
using Core.KeyWords;
using Core.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Dal.Context
{
    public class CampaingContext : IdentityDbContext<AplicationUser>
    {
        public CampaingContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Required for AspNetCore.Identity
            base.OnModelCreating(builder);
        }


        public DbSet<ADCompaing> Compaings { get; set; }
        public DbSet<CompaingAdGroupExt> CompaingAdGroupExt { get; set; }
        public DbSet<CompaingGroup> CompaingGroups { get; set; }
        public DbSet<CompaingKeyWord> KeyWords { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
  }
}
