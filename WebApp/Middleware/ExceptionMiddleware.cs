using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WebApp.Middleware
{
  public static class ExceptionMiddleware
  {
    public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger)
    {
      app.UseExceptionHandler(appError =>
      {
        appError.Run(async context =>
        {
          var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
          if (contextFeature == null)
          {
            return;
          }

          var errorDetails = new ErrorDetails();
          if (contextFeature.Error is BusinessException businessException)
          {
            logger.LogInformation(contextFeature.Error, "[ExceptionMiddleware] Catched an business exception");

            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

            errorDetails.StatusCode = context.Response.StatusCode;
            errorDetails.Message = businessException.Message;
          }
          else if (contextFeature.Error is Exception exception)
          {
            logger.LogError(exception, "[ExceptionMiddleware] Catched an exception");

            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            errorDetails.StatusCode = context.Response.StatusCode;
            errorDetails.Message = "Internal Server Error.";
          }

          context.Response.ContentType = "application/json";

          await context.Response.WriteAsync(errorDetails.ToString());
        });
      });
    }
  }
}
