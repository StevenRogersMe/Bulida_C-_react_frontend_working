using Dal.ViewModels;
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
  }
}
