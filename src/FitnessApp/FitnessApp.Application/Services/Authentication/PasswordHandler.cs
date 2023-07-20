using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace FitnessApp.Application.Services.Authentication;
public class PasswordHandler
{
    public static string HashPassword(string password)
    {
        string salt = BC.GenerateSalt(12);
        return BC.HashPassword(password, salt);
    }

    public static bool IsVerified(string passwordInputed, string passwordHashed) 
    {
        return BC.Verify(passwordHashed, passwordInputed);
    }
}
