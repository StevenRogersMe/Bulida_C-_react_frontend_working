using Dal.ViewModels.Requests;
using Dal.ViewModels.Responces;
using Google.Ads.GoogleAds.Config;
using Google.Ads.GoogleAds.Lib;
using Google.Ads.GoogleAds.V8.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
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


    [HttpPost("google-users")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<GoogleAccountListResponce>> GetGoogleAccountList([FromBody] GetGoogleAccountListRequest googleRequest)
    {
      var response = await googleService.GetGoogleAccountList(googleRequest);

      return Ok(response);
    }


    /// <summary>
    /// Called before the action method is invoked.
    /// </summary>
    /// <param name="context">The action executing context.</param>
    //public override void OnActionExecuting(ActionExecutingContext context)
    //{
    //  this.loginHelper = new WebLoginHelper(this.HttpContext, client.Config);
    //  if (loginHelper.IsLoggedIn)
    //  {
    //    client.Config.OAuth2RefreshToken = loginHelper.TokenResponse.RefreshToken;
    //  }
    //  base.OnActionExecuting(context);
    //}



    [HttpGet("[controller]/{customerId}/campaign")]
    public async Task<IActionResult> PostCampaign(long customerId)
    {

      try
      {
        var resp = await googleService.PostCurrentCampaing(UserId, client, customerId);

        return Content($"[{string.Join(",\n", resp)}]");
      }
      catch (GoogleAdsException e)
      {
        return Problem(e.Message);
      }
    }
  }
}
