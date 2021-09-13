using Dal.ViewModels;
using Dal.ViewModels.Requests;
using Dal.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.User;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/users")]
  [Produces("application/json")]
  public class AccountController : ControllerBase
  {
    private readonly IUserService userService;

    public AccountController(IUserService userService)
    {
      this.userService = userService;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> Register(RegisterModel model)
    {

      await userService.CreateUser(model);

      return Ok();
    }

    [HttpPost("reset")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> ResetPassword(ResetPasswordModel model)
    {
      var result = await userService.ResetPassword(model);

      return Ok(result);
    }

    [HttpPost("activator")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> SetNewUserPassword([FromBody] SetNewUserPasswordRequest request)
    {
      await userService.SetNewPassword(request);

      return Ok();
    }
  }
}
