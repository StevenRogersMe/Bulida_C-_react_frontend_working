using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WebApp.ViewModels
{
    public class ResponseViewModel
    {
        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }
        public object obj { get; set; }
    }
}
