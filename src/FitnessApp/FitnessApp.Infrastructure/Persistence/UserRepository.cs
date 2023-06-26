using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Infrastructure.Persistence;
public class UserRepository : IUserRepository
{
    private static readonly List<User> _users = new List<User>();

    public void Add(User user)
    {
        _users.Add(user);
    }

    public User? GetUserByEmail(string email)
    {
        User user = _users.SingleOrDefault(user => user.Email == email);
        return user;
    }
}
