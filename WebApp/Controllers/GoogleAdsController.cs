
using Dal.ViewModels;
using Dal.ViewModels.Responces;
using Google.Ads.GoogleAds.Config;
using Google.Ads.GoogleAds.Lib;
using Google.Ads.GoogleAds.V8.Errors;
using Google.Apis.Auth.AspNetCore3;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services.Compaing;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Helpers;

namespace WebApp.Controllers
{
  [Authorize]
  [ApiController]
  [Route("api/google-ads")]
  [Produces("application/json")]
  public class GoogleAdsController : ControllerBase
  {
    private readonly IGoogleService googleService;
    private readonly string UserId;

    /// <summary>
    /// The Google Ads client.
    /// </summary>
    private GoogleAdsClient client;

    /// <summary>
    /// The login helper.
    /// </summary>
    public WebLoginHelper loginHelper;

    /// <summary>
    /// Initializes a new instance of the <see cref="GoogleAdsController"/> class.
    /// </summary>
    /// <param name="configRoot">The configuration root.</param>
    /// <param name="googleService"></param>
    /// <param name="httpContextAccessor"></param>
    public GoogleAdsController(IConfiguration configRoot, IGoogleService googleService, IHttpContextAccessor httpContextAccessor)
    {
      this.UserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
      IConfigurationSection section = configRoot.GetSection("GoogleAdsApi");
      GoogleAdsConfig config = new GoogleAdsConfig(section);
      client = new GoogleAdsClient(config);
      this.googleService = googleService;
    }


    [HttpGet("google-users")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<GoogleAccountListResponce>> GetGoogleAccountList([FromServices] IGoogleAuthProvider auth)
    {
      GoogleCredential cred = await auth.GetCredentialAsync();

      var response = await googleService.GetGoogleAccountList(UserId, client);

      return Ok(response);
    }

    [HttpGet("put-to-google")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> PostCampaign(long customerId)
    {
      var resp = new GoogleResponceViewModel();
      try
      {
        resp = await googleService.PostCurrentCampaing(UserId, client, customerId);

        return Ok(resp);
      }
      catch (GoogleAdsException e)
      {
        resp.Error = e.Message;

        return Ok(resp);
      }
    }
  }
}
