using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Authentication;
using WebApp.Middleware;

namespace WebApp.IoC
{
  public static class SettingsDependenciesRegistrator
  {
    public static void RegisterAllConfigurationSettings(this IServiceCollection services, IConfiguration configuration)
    {
      #region JwtSettings

      var jwtSettings = new JwtSettings();
      configuration.GetSection(nameof(JwtSettings)).Bind(jwtSettings);
      services.AddSingleton(x => jwtSettings);

      #endregion

      #region JwtIssuerSettings

      var jwtIssuerSettings = new JwtIssuerSettings();
      configuration.GetSection(nameof(JwtIssuerSettings)).Bind(jwtIssuerSettings);
      services.AddSingleton(x => jwtIssuerSettings);

      #endregion

      #region GoogleSettings

      var googleSettings = new GoogleSettings();
      configuration.GetSection(nameof(GoogleSettings)).Bind(googleSettings);
      services.AddSingleton(x => googleSettings);

      #endregion


      #region OriginSettings

      var originSettings = new OriginSettings();
      configuration.GetSection(nameof(OriginSettings)).Bind(originSettings);
      services.AddSingleton(x => originSettings);

      #endregion
    }
  }
}
