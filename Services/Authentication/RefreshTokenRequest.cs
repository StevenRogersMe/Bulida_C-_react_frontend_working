using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Authentication
{
  public class RefreshTokenRequest
  {
    public string JwtToken { get; set; }
    public Guid RefreshToken { get; set; }
  }
}
