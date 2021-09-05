using Dal.ViewModels;
using System;
using System.Net;
using System.Net.Mail;

namespace Services.Email
{
  public interface IEmailService
  {
    bool Send(EmailMessageModel message);
  }
  public class EmailService : IEmailService
  {
    private readonly EmailSettings emailSettings;

    public EmailService(EmailSettings emailSettings)
    {
      this.emailSettings = emailSettings;
    }

    public bool Send(EmailMessageModel message)
    {
      using var smtpClient = new SmtpClient("smtp.gmail.com", 587)
      {
        EnableSsl = true,
        UseDefaultCredentials = true,
        DeliveryMethod = SmtpDeliveryMethod.Network,
        Credentials = new NetworkCredential(emailSettings.Username, emailSettings.Password)
      };

      var mailMessage = new MailMessage(
          new MailAddress(emailSettings.Email),
          new MailAddress(message.To))
      {
        Body = message.Body,
        Subject = message.Title,
        IsBodyHtml = true
      };

      ServicePointManager.ServerCertificateValidationCallback =
          (s, certificate, chain, sslPolicyErrors) => true;

      mailMessage.Priority = MailPriority.Normal;

      try
      {
        smtpClient.Send(mailMessage);
        return true;
      }
      catch (Exception exception)
      {
        return false;
      }
      finally
      {
        smtpClient.Dispose();
      }
    }
  }
}
