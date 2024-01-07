using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.DTO;

public class ChatInterlocuterDto
{
    public ChatInterlocuterDto(string firstName, string lastName, string email, string avatarFileName)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        AvatarFileName = avatarFileName;
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string AvatarFileName { get; set; }
}
