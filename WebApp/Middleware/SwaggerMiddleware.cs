using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace WebApp.Middleware
{
  public static class SwaggerMiddleware
  {
    public static void AddSwagger(this IServiceCollection services)
    {
      // Регистрация Swagger генератора
      services.AddSwaggerGen(c =>
      {
        const string bearer = "Bearer";

        c.SwaggerDoc("v1", new OpenApiInfo { Title = "VG.Dashboard.Api", Version = "v1" });
        c.AddSecurityDefinition(bearer, new OpenApiSecurityScheme
        {
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.ApiKey,
          Description = "JWT Authorization header using the Bearer scheme.",
          Name = "Authorization",
          Scheme = bearer
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {{
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = bearer
                        },
                        Scheme = "oauth2",
                        Name = bearer,
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                }});

        // Set the comments path for the Swagger JSON and UI.
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
      });
    }

    public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
    {
      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Campaing API V1");
      });

      return app;
    }
  }
}
