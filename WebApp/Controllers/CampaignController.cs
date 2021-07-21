using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [Authorize]
    public class CampaignController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Pages/Builder/Index.cshtml");
        }

        [HttpGet("[controller]/Tab1")]
        public ActionResult Tab1()
        {
            return View("~/Pages/Builder/Tab1.cshtml");
        }

        [HttpGet("[controller]/Tab2")]
        public ActionResult Tab2()
        {
            return View("~/Pages/Builder/Tab2.cshtml");
        }

        [HttpGet("[controller]/Tab3")]
        public ActionResult Tab3()
        {
            return View("~/Pages/Builder/Tab3.cshtml");
        }

        [HttpGet("[controller]/Tab4")]
        public ActionResult Tab4()
        {
            return View("~/Pages/Builder/Tab4.cshtml");
        }
    }
}
