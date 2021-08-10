namespace Services.Authentication.Dtos
{
  public class ValidationResultDto
  {
    public ValidationResultDto(AuthenticationErrorType authenticationErrorType)
    {
      AuthenticationErrorType = authenticationErrorType;
    }

    public AuthenticationErrorType AuthenticationErrorType { get; set; }
    public bool IsSuccess => AuthenticationErrorType == AuthenticationErrorType.None;
  }
}
