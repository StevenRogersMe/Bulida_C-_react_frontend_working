using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Users
{
  public class RefreshToken
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid Token { get; set; }

    public string UserId { get; set; }

    public string JwtId { get; set; }

    public bool IsUsed { get; set; }

    public bool IsInvalidated { get; set; }

    public DateTime ExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual AplicationUser User { get; set; }
  }
}
