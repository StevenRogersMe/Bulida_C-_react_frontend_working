using Dal.ViewModels;
using System.Collections.Generic;

namespace WebApp.ViewModels
{
  public class AdGroupViewModel
  {
    public string AdGroup { get; set; }
    public List<string> Keywords { get; set; }
    public List<string> Negatives { get; set; }
    public List<CallOutModel> CallOutExt { get; set; }
    public List<SnippetExtensionModel> SnippetExt { get; set; }
    public List<RespSearchAdModel> SearchExt { get; set; }
    public List<CallsOnlyAdModel> CallOnlyExt { get; set; }
    public List<ExpTextAdModel> ExpTextAdExt { get; set; }
  }
}
