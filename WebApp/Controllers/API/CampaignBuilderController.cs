using CsvHelper;
using Google.Ads.GoogleAds.Config;
using Google.Ads.GoogleAds.Lib;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services.Compaing;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Helpers;
using WebApp.ViewModels;

namespace WebApp.Controllers.API
{

  [Authorize]
  [ApiController]
  [Route("api/google-ads")]
  [Produces("application/json")]
  public class CampaignBuilderController : Controller
  {
    private readonly ICompaingAplicationService compaingService;
    private readonly string UserId;


    public CampaignBuilderController(ICompaingAplicationService compaingService, IHttpContextAccessor httpContextAccessor)
    {
      this.compaingService = compaingService;
      this.UserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
    }

    [HttpPost("save-csv")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public FileResult GetCsvFile([FromBody] CampaignViewModel campaign)
    {

      var csvModels = compaingService.GetCSVByIdAsync(campaign);
      var stream = new MemoryStream();
      using (var writeFile = new StreamWriter(stream, leaveOpen: true))
      {
        var csv = new CsvWriter(writeFile, System.Globalization.CultureInfo.CurrentCulture);
        csv.WriteRecords(csvModels);
      }
      stream.Position = 0; //reset stream
      return File(stream, "application/octet-stream", "ADCompaign.csv");
    }

    [HttpPost]
    public async Task SaveAndPostGoogleAsync([FromBody] CampaignViewModel campaign)
    {
      var dbModel = await compaingService.AddAsync(campaign, UserId);
    }
  }
}
