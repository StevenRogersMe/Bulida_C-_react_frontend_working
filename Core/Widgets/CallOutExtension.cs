using Core.Compaings;
using System.Collections.Generic;

namespace Core.Widgets
{
  public class CallOutExtension
  {
    public int Id { get; set; }
    public int AdGroupId { get; set; }
    public List<string> CallOutValues { get; set; }
    public int CompaingGroupId { get; set; }
    public virtual CompaingGroup CompaingGroup { get; set; }
  }
}
