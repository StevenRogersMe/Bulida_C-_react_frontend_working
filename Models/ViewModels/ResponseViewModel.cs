using System.Net;

namespace WebApp.ViewModels
{
  public class ResponseViewModel
  {
    public HttpStatusCode Status { get; set; }
    public string Message { get; set; }
    public object obj { get; set; }
  }
}
