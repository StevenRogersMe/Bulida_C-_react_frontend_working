using System;

namespace Dal.ViewModels.Requests
{
  public class SetNewUserPasswordRequest
  {
    public string Password { get; set; }
    public Guid Guid { get; set; }
  }
}
