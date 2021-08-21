using Core.Users;
using Dal.Context;
using Dal.Repositories.RefreshTokens;
using Dal.UnitOfWork;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Services.Authentication;
using Services.Compaing;
using Services.User;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using WebApp.IoC;
using WebApp.Middleware;

namespace WebApp
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // Register dependencies for using CORS, required for app.UseCors().
      services.AddCors();

      services.AddControllers();
      //services.AddSession();
      services.AddHttpContextAccessor();


      services.RegisterAllConfigurationSettings(Configuration);



      // Adds EntityFramework.
      services.AddDbContext<CampaingContext>(x =>
      {
              // Configuring EntityFramework for Postgres.
              x.UseNpgsql(Configuration.GetConnectionString("CompaingDatabase"));
      });

      services.AddIdentity<AplicationUser, IdentityRole>(options =>
      {
        options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultEmailProvider;
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 6;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.User.RequireUniqueEmail = true;
        options.SignIn.RequireConfirmedEmail = false;
        options.SignIn.RequireConfirmedAccount = false;
      })
         .AddEntityFrameworkStores<CampaingContext>().AddDefaultTokenProviders();

      // Builds provider of our settings from appsettings.json.
      var serviceProvider = services.BuildServiceProvider();

      // Adding Authentication based on using of JwtToken.
      var jwtSettings = serviceProvider.GetService<JwtSettings>();
      var jwtIssuerSettings = serviceProvider.GetService<JwtIssuerSettings>();
      var googleSettings = serviceProvider.GetService<GoogleSettings>();
      services.AddAuthentication(jwtSettings, jwtIssuerSettings, googleSettings);

      // Authorization.
      services.AddAuthorization();

      // Adds Swagger.
      services.AddSwagger();
      services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
      services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
      services.AddScoped<ICompaingAplicationService, CompaingAplicationService>();
      services.AddScoped<IGoogleService, GoogleService>();
      services.AddScoped<IAuthenticationService, AuthenticationService>();
      services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
      services.AddScoped<IRefreshTokenService, RefreshTokenService>();
      services.AddScoped<IJwtTokenService, JwtTokenService>();
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped<IUserService, UserService>();
      services.AddScoped<JwtSecurityTokenHandler>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory factory)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        // Add Swagger
        app.UseSwaggerDocumentation();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      // Intercept exceptions
      app.ConfigureExceptionHandler(factory.CreateLogger<Startup>());

      // Auto redirect to https
      app.UseHttpsRedirection();

      // Adds setup HttpContext.User for each request.
      app.UseAuthentication();

      // Routing for requests
      app.UseRouting();

      var originSettings = app.ApplicationServices.GetRequiredService<OriginSettings>();
      app.UseCors(x => x.WithOrigins(originSettings.FrontendOrigin)
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());

      // Adds the component, which controls access to resources.
      app.UseAuthorization();


      // Adds our controllers and actions to the list of possible endpoints.
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
