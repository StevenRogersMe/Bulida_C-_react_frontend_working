using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Compaings
{
    public class CompaingAdGroupExt
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string FinalURL { get; set; }
        public string FinalMobileURL { get; set; }
        public string Path1 { get; set; }
        public string Path2 { get; set; }
        public string VerificationURL { get; set; }
        public string DisplayURL { get; set; }
        public string BusinessName { get; set; }
        public string Country { get; set; }
        public string PhoneNumber { get; set; }
        public string Headline1 { get; set; }
        public int? Headline1Position { get; set; }
        public string Headline2 { get; set; }
        public int? Headline2Position { get; set; }
        public string Headline3 { get; set; }
        public int? Headline3Position { get; set; }
        public string Description { get; set; }
        public int? Description1Position { get; set; }
        public string Description2 { get; set; }
        public int? Description2Position { get; set; }
        public int? CompaingGroupId { get; set; }
        public virtual CompaingGroup CompaingGroup { get; set; }
    }
}
