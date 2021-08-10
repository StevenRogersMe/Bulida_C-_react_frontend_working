using System;

namespace Services.Authentication
{
  public class AuthenticationResponse
  {
    public AuthenticationResponse() { }

    public AuthenticationResponse(AuthenticationErrorType authenticationErrorType) =>
        AuthenticationErrorType = authenticationErrorType;

    public string JwtToken { get; set; }
    public Guid RefreshToken { get; set; }
    public AuthenticationErrorType AuthenticationErrorType { get; set; }
  }
}
