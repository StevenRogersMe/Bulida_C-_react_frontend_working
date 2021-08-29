using Core.Users;
using Dal.Context;
using Dal.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Services.User
{
  public interface IUserService
  {
    Task<AplicationUser> CreateGoogleUser(Payload payload);
    Task<AplicationUser> CreateUser(RegisterModel registerModel);
  }
  public class UserService : IUserService
  {
    private CampaingContext campaingContext;
    private readonly UserManager<AplicationUser> userManager;

    public UserService(CampaingContext campaingContext, UserManager<AplicationUser> userManager)
    {
      this.campaingContext = campaingContext;
      this.userManager = userManager;
    }

    public async Task<AplicationUser> CreateGoogleUser(Payload payload)
    {
      var user = new AplicationUser { Email = payload.Email, FirstName = payload.Name, LastName = payload.FamilyName, IsGoogleUser = true };

      campaingContext.Users.Add(user);
      await campaingContext.SaveChangesAsync();

      return user;
    }

    public async Task<AplicationUser> CreateUser(RegisterModel registerModel)
    {
      var user = new AplicationUser
      {
        Email = registerModel.Email,
        FirstName = registerModel.FirstName,
        LastName = registerModel.LastName
      };

      await userManager.CreateAsync(user, registerModel.Password);

      return user;
    }
  }
}
