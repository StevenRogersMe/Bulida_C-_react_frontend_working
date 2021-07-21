using Core.Compaings;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Widgets
{
    public class RespSearchAd
    {
        public int Id { get; set; }
        public string DescriptionOne { get; set; }
        public string DescriptionTwo { get; set; }
        public string DescriptionThree { get; set; }
        public string DescriptionFour { get; set; }
        public string FinalURL { get; set; }
        public string PathOne { get; set; }
        public string PathTwo { get; set; }
        public string AdGroupName { get; set; }
        public List<string> HeadLines { get; set; }
        public int CompaingGroupId { get; set; }
        public virtual CompaingGroup CompaingGroup { get; set; }
    }
}
