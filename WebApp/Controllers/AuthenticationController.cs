
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
  }
}
