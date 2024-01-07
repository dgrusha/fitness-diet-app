using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class PasswordResetHolder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Code { get; set; }
    public bool Active { get; set; } = true;
    public DateTime ExpirationTime { get; set; } = DateTime.Now.AddMinutes(60);
    public Guid UserId { get; set; }
    public User User { get; set; }
}
