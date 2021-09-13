using Dal.ViewModels;
using System.Collections.Generic;

namespace WebApp.ViewModels
{
  public class AdGroupViewModel
  {
    public string AdGroup { get; set; }
    public List<string> Keywords { get; set; }
    public List<string> Negatives { get; set; }
    public virtual List<ExpTextAdModel> ExpTxtAds { get; set; }
    public virtual List<CallsOnlyAdModel> CallOnlyAds { get; set; }
    public virtual List<RespSearchAdModel> RespSearchAds { get; set; }
    public virtual List<CallOutModel> CallOutAds{ get; set; }
    public virtual List<SnippetExtensionModel> SnippetExtensions { get; set; }
  }
}
