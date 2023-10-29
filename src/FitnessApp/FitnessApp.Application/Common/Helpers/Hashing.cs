using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Helpers;
public class Hashing : IHashing
{
    public string HashFileName(string name)
    {
        string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(name);

        using (MD5 md5 = MD5.Create())
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(fileNameWithoutExtension);
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hashBytes.Length; i++)
            {
                sb.Append(hashBytes[i].ToString("X2"));
            }

            return sb.ToString();
        }
    }

    public string GetUniqueName(string sender, string receiver)
    {
        string concatenatedNames = sender.CompareTo(receiver) < 0
            ? $"{sender}_{receiver}"
            : $"{receiver}_{sender}";

        using (SHA256 sha256 = SHA256.Create())
        {
            byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(concatenatedNames));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
}
