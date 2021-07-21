using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dal.ViewModels
{
    public class RegisterModel
    {
            [Required(ErrorMessage = "Email required")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Password required")]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Compare("Password", ErrorMessage = "Wrong password")]
            public string ConfirmPassword { get; set; }
    }
}
