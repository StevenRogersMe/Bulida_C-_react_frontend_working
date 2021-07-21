
using Core.Compaings;

namespace Core.Widgets
{
    public class ExpTxtAd
    {
        public int Id { get; set; }
        public string HeadlineOne { get; set; }
        public string HeadlineTwo { get; set; }
        public string HeadlineThree { get; set; }
        public string DescriptionOne { get; set; }
        public string DescriptionTwo { get; set; }
        public string FinalURL { get; set; }
        public string PathOne { get; set; }
        public string PathTwo { get; set; }
        public string AdGroupName { get; set; }
        public int CompaingGroupId { get; set; }
        public virtual CompaingGroup CompaingGroup { get; set; }
    }
}

