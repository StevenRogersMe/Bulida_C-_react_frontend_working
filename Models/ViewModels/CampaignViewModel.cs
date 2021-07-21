using Core.Widgets;
using Dal.ViewModels;
using System;
using System.Collections.Generic;

namespace WebApp.ViewModels
{
    public class CampaignViewModel
    {
        public decimal Budget { get; set; }
        public bool Exact { get; set; }
        public bool Phrase { get; set; }
        public bool Modifier { get; set; }
        public bool Broad { get; set; }
        public bool NegativePhrase { get; set; }
        public bool Skag { get; set; }
        public bool Stag { get; set; }
        public List<AdGroupViewModel> AdGroupList { get; set; }
        public string Name { get; set; }
        public string GoogaleAccountId { get; set; }
        public List<CallOnlyAd> CallOutExt { get; set; }
        public List<SnippetExtension> SnippetExt { get; set; }
        public List<RespSearchAd> SearchExt { get; set; }
        public List<CallOnlyAd> CallOnlyExt { get; set; }
        public List<ExpTextAdModel> ExpTextAdExt { get; set; }

    }
}
