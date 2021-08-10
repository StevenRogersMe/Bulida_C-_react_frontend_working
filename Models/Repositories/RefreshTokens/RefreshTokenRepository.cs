using Core.Users;
using Dal.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Threading.Tasks;

namespace Dal.Repositories.RefreshTokens
{
  public interface IRefreshTokenRepository
  {
    Task<RefreshToken> GetAsync(Guid refreshToken);
    EntityEntry<RefreshToken> Add(RefreshToken refreshToken);
    EntityEntry<RefreshToken> Update(RefreshToken refreshToken);
  }
  public class RefreshTokenRepository : IRefreshTokenRepository
  {
    private CampaingContext campaingContext;

    public RefreshTokenRepository(CampaingContext campaingContext)
    {
      this.campaingContext = campaingContext;
    }

    public EntityEntry<RefreshToken> Add(RefreshToken refreshToken)
    {
      return campaingContext.RefreshTokens.Add(refreshToken);
    }

    public Task<RefreshToken> GetAsync(Guid refreshToken)
    {
      return campaingContext.RefreshTokens.SingleOrDefaultAsync(x => x.Token == refreshToken);
    }

    public EntityEntry<RefreshToken> Update(RefreshToken refreshToken)
    {
      return campaingContext.RefreshTokens.Update(refreshToken);
    }
  }
}
