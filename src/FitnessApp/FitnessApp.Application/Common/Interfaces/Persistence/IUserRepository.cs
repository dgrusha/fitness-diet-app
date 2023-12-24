using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IUserRepository
{
    User? GetUserByEmail(string email);
    User? GetUserById(Guid id);
    void Add(User user);
    void UpdateObligatoryFormStatus(User user, bool hasObligatoryForm);
    void UpdateUserInfo(User user, string firstName, string lastName);
    void UpdateUserAvatar(User user, string avatarName);
    void UpdateUserDietStatus(User user, PreparingStatus preparingStatus);
    void ChangeUserPassword(Guid id, string password);
    List<UserDto> GetAllUsersExceptMe(Guid id);
    List<UserDto> GetAllCoachesExceptMe(Guid id);
}
