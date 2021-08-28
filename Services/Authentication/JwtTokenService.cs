using Core.Users;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Services.Authentication
{
  public interface IJwtTokenService
  {
    SecurityToken GenerateJwtToken(AplicationUser user);

    SecurityToken GetGoogleSecurityToken(AplicationUser user, Payload payload);

    ClaimsPrincipal GetClaimsPrincipal(string jwtToken);

    bool IsNotExpired(ClaimsPrincipal claimsPrincipal);
  }
  public class JwtTokenService : IJwtTokenService
  {
    private readonly string _algorithm = SecurityAlgorithms.HmacSha256;
    private readonly TokenValidationParameters _tokenValidationParameters;
    private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
    private readonly JwtIssuerSettings _jwtIssuerSettings;
    private readonly JwtSettings _jwtSettings;

    public JwtTokenService(TokenValidationParameters tokenValidationParameters, JwtSecurityTokenHandler jwtSecurityTokenHandler, JwtIssuerSettings jwtIssuerSettings, JwtSettings jwtSettings)
    {
      _tokenValidationParameters = tokenValidationParameters;
      _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
      _jwtIssuerSettings = jwtIssuerSettings;
      _jwtSettings = jwtSettings;
    }

    public SecurityToken GenerateJwtToken(AplicationUser user)
    {
      var claims = new ClaimsIdentity(new[]
      {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtIssuerSettings.Issuer),
                new Claim(JwtRegisteredClaimNames.Aud, _jwtIssuerSettings.Audience),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            });

      var secretKey = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);
      var signingCredentials = new SigningCredentials(key: new SymmetricSecurityKey(secretKey),
                                                      algorithm: _algorithm);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = claims,
        SigningCredentials = signingCredentials,
        Expires = DateTime.UtcNow.Add(_jwtSettings.TokenLifeTime)
      };

      return _jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
    }

    public SecurityToken GetGoogleSecurityToken(AplicationUser user, Payload payload)
    {
      var claims = new ClaimsIdentity(new[]
     {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtIssuerSettings.Issuer),
                new Claim(JwtRegisteredClaimNames.Aud, _jwtIssuerSettings.Audience),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            });

      var secretKey = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);
      var signingCredentials = new SigningCredentials(key: new SymmetricSecurityKey(secretKey),
                                                      algorithm: _algorithm);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = claims,
        SigningCredentials = signingCredentials,
        Expires = DateTime.UtcNow.Add(_jwtSettings.TokenLifeTime)
      };

      return _jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
    }

    /// <inheritdoc/>
    public ClaimsPrincipal GetClaimsPrincipal(string jwtToken)
    {
      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = _tokenValidationParameters.IssuerSigningKey,
        ValidateLifetime = false
      };

      var claimsPrincipal = _jwtSecurityTokenHandler.ValidateToken(jwtToken, tokenValidationParameters, out var validatedToken);
      if (IsValidSecurityAlgorithm(validatedToken))
      {
        return claimsPrincipal;
      }

      return null;
    }

    /// <inheritdoc/>
    public bool IsNotExpired(ClaimsPrincipal claimsPrincipal)
    {
      var expClaim = claimsPrincipal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value;
      var expiryDateUnix = long.Parse(expClaim);

      var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
          .AddSeconds(expiryDateUnix)
          .Subtract(_jwtSettings.TokenLifeTime);

      var isNotExpired = expiryDateTimeUtc > DateTime.UtcNow;

      return isNotExpired;
    }


    private bool IsValidSecurityAlgorithm(SecurityToken validatedToken)
    {
      if (validatedToken is JwtSecurityToken jwtSecurityToken)
      {
        var isAlgorithmValid = jwtSecurityToken.Header.Alg.Equals(
            _algorithm, StringComparison.InvariantCultureIgnoreCase);

        return isAlgorithmValid;
      }

      return false;
    }
  }
}
