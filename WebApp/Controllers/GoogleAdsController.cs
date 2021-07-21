using Google.Ads.GoogleAds.Config;
using Google.Ads.GoogleAds.Lib;
using Google.Ads.GoogleAds.V8.Errors;
using Google.Ads.GoogleAds.V8.Services;
using Google.Protobuf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Services.Compaing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Helpers;

namespace WebApp.Controllers
{
    public class GoogleAdsController : Controller
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
    public GoogleAdsController(IConfiguration configRoot, IGoogleService googleService, IHttpContextAccessor httpContextAccessor)
    {
      this.UserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
      IConfigurationSection section = configRoot.GetSection("GoogleAdsApi");
      GoogleAdsConfig config = new GoogleAdsConfig(section);
      client = new GoogleAdsClient(config);
      this.googleService = googleService;
    }
    public ActionResult Index()
            {
              return View("~/Pages/GoogleAds/Index.cshtml");
            }
    /// <summary>
    /// Called before the action method is invoked.
    /// </summary>
    /// <param name="context">The action executing context.</param>
    public override void OnActionExecuting(ActionExecutingContext context)
        {
            this.loginHelper = new WebLoginHelper(this.HttpContext, client.Config);
            if (loginHelper.IsLoggedIn)
            {
                client.Config.OAuth2RefreshToken = loginHelper.TokenResponse.RefreshToken;
            }
            base.OnActionExecuting(context);
    }



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
