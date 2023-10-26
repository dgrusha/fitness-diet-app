using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

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

    public List<UserDto> GetAllUsersExceptMe(Guid id)
    {
        return _userContext.Users
            .Where(u => u.Id != id)
            .Select(u => new UserDto
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Mail = u.Email
            })
            .ToList();
    }

    public User? GetUserByEmail(string email)
    {
        User user = _userContext.Users.SingleOrDefault(user => user.Email == email);
        return user;
    }

    public User? GetUserById(Guid id)
    {

        User user = _userContext.Users.Include(u => u.ObligatoryForm).SingleOrDefault(user => user.Id == id);
        return user;
    }

    public void UpdateObligatoryFormStatus(User user, bool hasObligatoryForm)
    {
        user.HasObligatoryForm = hasObligatoryForm;
        _userContext.SaveChangesAsync();
    }

    public void UpdateUserAvatar(User user, string avatarName)
    {
        user.AvatarFileName = avatarName;
        _userContext.SaveChanges();
    }

    public void UpdateUserInfo(User user, string firstName, string lastName)
    {
        user.FirstName = firstName;
        user.LastName = lastName;
        _userContext.SaveChanges();
    }
}
