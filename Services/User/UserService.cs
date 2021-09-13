using Core.Users;
using Dal.Context;
using Dal.ViewModels;
using Dal.ViewModels.Requests;
using Dal.ViewModels.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Email;
using Services.Settings;
using System;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Services.User
{
  public interface IUserService
  {
    Task<AplicationUser> CreateGoogleUser(Payload payload);
    Task<AplicationUser> CreateUser(RegisterModel registerModel);
    Task<ResetPasswordResponse> ResetPassword(ResetPasswordModel resetModel);
    Task SetNewPassword(SetNewUserPasswordRequest request);
  }
  public class UserService : IUserService
  {
    private CampaingContext campaingContext;
    private readonly UserManager<AplicationUser> userManager;
    private readonly IEmailService emailService;
    private readonly OriginSettings originSettings;

    public UserService(CampaingContext campaingContext, UserManager<AplicationUser> userManager, IEmailService emailService, OriginSettings originSettings)
    {
      this.campaingContext = campaingContext;
      this.userManager = userManager;
      this.emailService = emailService;
      this.originSettings = originSettings;
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

    public async Task<ResetPasswordResponse> ResetPassword(ResetPasswordModel resetModel)
    {
      var user = await userManager.FindByEmailAsync(resetModel.Email);
      var result = new ResetPasswordResponse();
      if (user == null)
      {
        result.Result = ResetPasswordResult.UserNotFound;
        return result;
      }

      var code = Guid.NewGuid();
      user.ConfirmCode = code;

      campaingContext.Users.Update(user);
      await campaingContext.SaveChangesAsync();

      var message = new EmailMessageModel();
      message.To = resetModel.Email;
      message.Title = "Password Reset";
      message.Body =
                    $"<a href=\"{originSettings.FrontendOrigin}/activator/{user.ConfirmCode.ToString()}\">" +
                    $"Reset password" +
                    $"</a>";
      
      var messageResponce =  emailService.Send(message);
      if(messageResponce)
      {
        result.Result = ResetPasswordResult.Done;
        return result;
      }

      result.Result = ResetPasswordResult.ServerError;
      return result;
    }

    public async Task SetNewPassword(SetNewUserPasswordRequest request)
    {
        var user = await campaingContext.Users
            .FirstOrDefaultAsync(x => x.ConfirmCode == request.Guid);

        await userManager.RemovePasswordAsync(user);
        var res = await userManager.AddPasswordAsync(user, request.Password);
    }
  }
}
