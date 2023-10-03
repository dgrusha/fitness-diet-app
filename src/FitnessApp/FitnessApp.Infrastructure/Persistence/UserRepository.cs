using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class UserRepository : IUserRepository
{
    private readonly FitnessContext _userContext;

    public UserRepository(FitnessContext userContext)
    {
        _userContext = userContext;
    }

    public void Add(User user)
    {
        _userContext.Users.Add(user);
        _userContext.SaveChangesAsync();
    }

    public User? GetUserByEmail(string email)
    {
        User user = _userContext.Users.SingleOrDefault(user => user.Email == email);
        return user;
    }
}
