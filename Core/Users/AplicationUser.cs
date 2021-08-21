using Core.Compaings;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Users
{
  public class AplicationUser : IdentityUser
  {

    [MaxLength(128)]
    public string FirstName { get; set; }

    [MaxLength(128)]
    public string LastName { get; set; }

    [MaxLength(128)]
    public string MiddleName { get; set; }

    [MaxLength(256)]
    public override string Email { get; set; }

    public bool IsGoogleUser { get; set; }

    public List<ADCompaing> CompaingGroups { get; set; }
  }
}
