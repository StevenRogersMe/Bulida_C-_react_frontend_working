using Google.Ads.GoogleAds.Config;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebApp.Helpers;

namespace WebApp.Controllers
{
    [Route("login")]
    public class GoogleLoginController : Controller
    {
        private WebLoginHelper loginHelper;

        /// <summary>
        /// The Google Ads configuration.
        /// </summary>
        private GoogleAdsConfig config;

    /// <summary>
    /// Initializes a new instance of the <see cref="GoogleLoginController"/> class.
    /// </summary>
    /// <param name="configRoot">The configuration root.</param>
    public GoogleLoginController(IConfiguration configRoot)
        {
            IConfigurationSection section = configRoot.GetSection("GoogleAdsApi");
            config = new GoogleAdsConfig(section);
        }

        public IActionResult OnGet()
        {
            loginHelper = new WebLoginHelper(this.HttpContext, config);

            if (loginHelper.IsLoggedIn)
            {
                // Redirect to the main page.
                return Redirect("~/GoogleAds");
            }
            else if (loginHelper.IsCallbackFromOAuthServer())
            {
                loginHelper.ExchangeAuthorizationCodeForCredentials();

                // Redirect to the main page.
                return Redirect("~/GoogleAds");
            }
            else
            {
                // Redirect the user to the OAuth2 login page.
                return loginHelper.RedirectUsertoOAuthServer();
            }
        }
    }
}
