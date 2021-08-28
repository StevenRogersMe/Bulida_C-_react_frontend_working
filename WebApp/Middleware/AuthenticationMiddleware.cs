using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Services.Authentication;
using System;
using System.Text;

namespace WebApp.Middleware
{
  public static class AuthenticationMiddleware
  {
    public static void AddAuthentication(this IServiceCollection services,
                                            JwtSettings jwtSettings,
                                            JwtIssuerSettings jwtIssuerSettings, GoogleSettings googleSettings)
    {

      var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey));


      services.Configure<JwtIssuerSettings>(options =>
      {
        options.Issuer = jwtIssuerSettings.Issuer;
        options.Audience = jwtIssuerSettings.Audience;
        options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
      });


      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidIssuer = jwtIssuerSettings.Issuer,

        ValidateAudience = true,
        ValidAudience = jwtIssuerSettings.Audience,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = signingKey,

        RequireExpirationTime = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
      };

      services.AddScoped(x => tokenValidationParameters);


      services.AddAuthentication(x =>
      {
        //x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
      }).AddJwtBearer(x =>
      {
        x.TokenValidationParameters = tokenValidationParameters;
        x.ClaimsIssuer = jwtIssuerSettings.Issuer;
        x.SaveToken = true;
      })
      .AddGoogle(options =>
      {
        options.ClientId = googleSettings.OAuth2ClientId;
        options.ClientSecret = googleSettings.OAuth2ClientSecret;
      });

    }
  }
}
