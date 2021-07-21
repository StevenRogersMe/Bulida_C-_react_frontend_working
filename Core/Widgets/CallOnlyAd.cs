using Core.Compaings;

namespace Core.Widgets
{
    public class CallOnlyAd
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string PhoneNumber { get; set; }
        public string HeadlineOne { get; set; }
        public string HeadlineTwo { get; set; }
        public string DescriptionOne { get; set; }
        public string DescriptionTwo { get; set; }
        public string BusinessName { get; set; }
        public string VerificationURL { get; set; }
        public string FinalUrl { get; set; }
        public int CompaingGroupId { get; set; }
        public string AdGroupName { get; set; }
        public virtual CompaingGroup CompaingGroup { get; set; }
    }
    }
