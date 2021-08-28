using Core.Compaings;
using System.Collections.Generic;
using static Google.Ads.GoogleAds.V8.Enums.KeywordMatchTypeEnum.Types;

namespace Core.KeyWords
{
  public class CompaingKeyWord
  {
    public int Id { get; set; }
    public int AdGroupId { get; set; }
    public string KeywordGroupName { get; set; }
    public KeywordMatchType KeywordMatchType { get; set; }
    public List<string> KeyWords { get; set; }
    public virtual CompaingGroup CompaingGroup { get; set; }
  }
}