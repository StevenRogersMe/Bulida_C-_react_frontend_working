using System.Collections.Generic;

namespace WebApp.ViewModels
{
  public class AdGroupViewModel
  {
    public string AdGroup { get; set; }
    public List<string> Keywords { get; set; }
    public List<string> Negatives { get; set; }
    public List<AdsExts> EdsExts { get; set; }
  }
}
