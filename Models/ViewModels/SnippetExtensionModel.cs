using System.Collections.Generic;

namespace Dal.ViewModels
{
  public class SnippetExtensionModel
  {
    public string Language { get; set; }
    public string AdGroupName { get; set; }
    public string HeaderType { get; set; } // ???
    public List<string> SnippetValues { get; set; }
  }
}
