using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers.API
{
  [Route("api/[controller]")]
  [Authorize]
  [ApiController]
  public class CountryController : ControllerBase
  {
    public IActionResult Index()
    {
      return RedirectToAction();
    }

    [HttpGet]
    public void GetCoutry()
    {

    }
  }
}
