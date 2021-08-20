using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Authentication;
using Services.Authentication.Google;
using System.Linq;
using System.Threading.Tasks;
using IAuthenticationService = Services.Authentication.IAuthenticationService;

namespace WebApp.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/authentication")]
  [Produces("application/json")]
  public class AuthenticationController : ControllerBase
  {
    private IAuthenticationService authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
      this.authenticationService = authenticationService;
    }

    /// <summary>
    /// Athentication
    /// </summary>
    [AllowAnonymous]
    [HttpPost("token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<AuthenticationResponse>> Authenticate([FromBody] AuthenticationRequest request)
    {
      var response = await authenticationService.Authenticate(request);

      return Ok(response);
    }

    /// <summary>
    /// Refresh token
    /// </summary>
    [AllowAnonymous]
    [HttpPost("refresh")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<AuthenticationResponse>> Refresh([FromBody] RefreshTokenRequest request)
    {
      var response = await authenticationService.Refresh(request);

      return Ok(response);
    }

    /// <summary>
    /// Google athentication
    /// </summary>
    [AllowAnonymous]
    [HttpPost("google-login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GoogleLogin(GoogleRequest googleRequest)
    {
      var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse") };
      return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    }

    /// <summary>
    /// Get google user
    /// </summary>
    [AllowAnonymous]
    [Route("google-response")]
    public async Task<IActionResult> GoogleResponse()
    {
      var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

      var claims = result.Principal.Identities
          .FirstOrDefault().Claims.Select(claim => new
          {
            claim.Issuer,
            claim.OriginalIssuer,
            claim.Type,
            claim.Value
          });

      return Ok(result);
    }

  }
}
