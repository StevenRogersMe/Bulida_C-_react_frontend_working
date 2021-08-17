using System;

namespace Services.Authentication
{
  public class RefreshTokenRequest
  {
    public string JwtToken { get; set; }
    public Guid RefreshToken { get; set; }
  }
}
