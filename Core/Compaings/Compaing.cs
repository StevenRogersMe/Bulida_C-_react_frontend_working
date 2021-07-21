using Core.Users;
using System;
using System.Collections.Generic;

namespace Core.Compaings
{
  public class ADCompaing
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Budget { get; set; }
    public bool Exact { get; set; }
    public bool Phrase { get; set; }
    public bool Modifier { get; set; }
    public bool Broad { get; set; }
    public bool NegativePhrase { get; set; }
    public bool Skag { get; set; }
    public bool Stag { get; set; }
    public bool ValidFlag { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public List<CompaingGroup> CompaingGroups { get; set; }
    public string UserId { get; set; }
    public AplicationUser AplicationUser { get;set;}
    }
}
