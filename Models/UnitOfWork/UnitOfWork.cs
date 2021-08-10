using Dal.Context;
using System.Threading.Tasks;

namespace Dal.UnitOfWork
{
  public interface IUnitOfWork
  {
    Task SaveChangesAsync();
  }

  public class UnitOfWork : IUnitOfWork
  {
    private readonly CampaingContext campaingContext;

    public UnitOfWork(CampaingContext campaingContext)
    {
      this.campaingContext = campaingContext;
    }

    public Task SaveChangesAsync()
    {
      return campaingContext.SaveChangesAsync();
    }
  }
}
