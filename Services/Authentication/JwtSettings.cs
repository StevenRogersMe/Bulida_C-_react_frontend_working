using System;

namespace Services.Authentication
{
  public class JwtSettings
  {
    public string SecretKey { get; set; }
    public TimeSpan TokenLifeTime { get; set; }
    public int RefreshTokenLifeTimeInMonth { get; set; }
  }
}
