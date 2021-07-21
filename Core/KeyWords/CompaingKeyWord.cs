using Core.Compaings;
using Google.Api.Ads.AdWords.v201809;
using System;
using System.Collections.Generic;

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
