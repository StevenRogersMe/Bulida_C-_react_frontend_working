using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Services.Authentication
{
  public static class ClaimsPrincipalExtensions
  {
    public static string GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
      return claimsPrincipal.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value;
    }

    public static string GetJwtId(this ClaimsPrincipal claimsPrincipal)
    {
      return claimsPrincipal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
    }
  }
}
