using Core.Users;
using Dal.Context;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Services.User
{
  public interface IUserService
  {
    Task<AplicationUser> CreateGoogleUser(Payload payload);
  }
  public class UserService : IUserService
  {
    private CampaingContext campaingContext;

    public UserService(CampaingContext campaingContext)
    {
      this.campaingContext = campaingContext;
    }

    public async Task<AplicationUser> CreateGoogleUser(Payload payload)
    {
      var user = new AplicationUser { Email = payload.Email, FirstName = payload.Name, LastName = payload.FamilyName, IsGoogleUser = true };

      campaingContext.Users.Add(user);
      await campaingContext.SaveChangesAsync();

      return user;
    }
  }
}
