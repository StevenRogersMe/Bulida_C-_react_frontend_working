using Core.Users;
using Services.Authentication.Dtos;
using System;

namespace Services.Authentication
{
  public interface IRefreshTokenService
  {
    RefreshToken GenerateRefreshToken(string userId, string jwtId);
    ValidationResultDto ValidateRefreshToken(RefreshToken refreshToken, string jwtId);
  }
  public class RefreshTokenService : IRefreshTokenService
  {
    private readonly JwtSettings _jwtSettings;

    public RefreshToken GenerateRefreshToken(string userId, string jwtId)
    {
      return new RefreshToken
      {
        Token = Guid.NewGuid(),
        UserId = userId,
        JwtId = jwtId,
        CreatedAt = DateTime.UtcNow,
        ExpiresAt = DateTime.UtcNow.AddMonths(_jwtSettings.RefreshTokenLifeTimeInMonth)
      };
    }

    /// <inheritdoc/>
    public ValidationResultDto ValidateRefreshToken(RefreshToken refreshToken, string jwtId)
    {
      if (refreshToken == null)
        return new ValidationResultDto(AuthenticationErrorType.IsTokenNotFound);
      if (refreshToken.IsUsed)
        return new ValidationResultDto(AuthenticationErrorType.IsTokenUsed);
      if (refreshToken.IsInvalidated)
        return new ValidationResultDto(AuthenticationErrorType.IsTokenInvalid);
      if (refreshToken.JwtId != jwtId)
        return new ValidationResultDto(AuthenticationErrorType.IsTokenInvalid);
      if (DateTime.UtcNow > refreshToken.ExpiresAt)
        return new ValidationResultDto(AuthenticationErrorType.IsExpired);

      return new ValidationResultDto(AuthenticationErrorType.None);
    }
  }
}
