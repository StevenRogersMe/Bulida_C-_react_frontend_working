using Core.KeyWords;
using Core.Widgets;
using System.Collections.Generic;

namespace Core.Compaings
{
    public class CompaingGroup
    {
        public int Id { get; set; }
        public int CampignId { get; set; }
        public string AdGroup { get; set; }
        public virtual ADCompaing Compaing { get; set; }
        public List<string> Negatives { get; set; }
        public virtual ICollection<CompaingKeyWord> KeyWords { get; set; }
        public virtual ICollection<ExpTxtAd> ExpTxtAds { get; set; }
        public virtual ICollection<CallOnlyAd> CallOnlyAds { get; set; }
        public virtual ICollection<RespSearchAd> RespSearchAds { get; set; }
  }
}
