﻿using System;
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
        _userContext.SaveChanges();
    }

    public void Delete(User user)
    {
        _userContext.Users.Remove(user);
        _userContext.SaveChanges();
    }
    public void ChangeUserPassword(Guid id, string password)
    {
        var user = _userContext.Users.FirstOrDefault(u => u.Id == id);
        if (user != null) 
        {
            user.Password = password;
            _userContext.SaveChanges();
        }
    }

		public List<CoachDto> GetAllCoachesExceptMe(Guid id)
    {
        return _userContext.Users
            .Where(u => u.Id != id && u.Coach != null && u.Coach.IsVerified == true)
            .Select(u => new CoachDto
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Mail = u.Email,
                RecomendationText = u.Coach.RecomendationText,
                CVFileName = u.Coach.CVFileName,
                AvatarFileName = u.AvatarFileName
            })
            .ToList();
    }

    public List<UserDto> GetAllUsersExceptMe(Guid id)
    {
        return _userContext.Users
            .Where(u => u.Id != id && u.Coach == null)
            .Select(u => new UserDto
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Mail = u.Email
            })
            .ToList();
    }

    public List<CoachDto> GetNotVerifiedCoaches()
    {
        return _userContext.Users
            .Where(u => u.Coach != null && u.Coach.IsVerified == false)
            .Select(u => new CoachDto
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Mail = u.Email, 
                CVFileName = u.Coach.CVFileName,
                RecomendationText = u.Coach.RecomendationText,
            })
            .ToList();
    }

    public User? GetUserByEmail(string email)
    {
        User? user = _userContext.Users.SingleOrDefault(user => user.Email.Equals(email));
        return user;
    }

    public User? GetUserById(Guid id)
    {
        User? user = _userContext.Users
            .Include(u => u.ObligatoryForm)
            .Include(u => u.Coach)
            .Include(u => u.DietForm)
            .Include(u => u.TrainingForm)
            .Include(u => u.SubscriptionForCoach)
            .SingleOrDefault(user => user.Id == id);
        return user;
    }

    public void UpdateObligatoryFormStatus(User user, bool hasObligatoryForm)
    {
        user.HasObligatoryForm = hasObligatoryForm;
        _userContext.SaveChanges();
    }

    public void UpdateUserAvatar(User user, string avatarName)
    {
        user.AvatarFileName = avatarName;
        _userContext.SaveChanges();
    }

    public void UpdateUserDietStatus(User user, PreparingStatus preparingStatus)
    {
        user.DietStatus = preparingStatus;
        _userContext.SaveChanges();
    }

    public void UpdateUserInfo(User user, string firstName, string lastName)
    {
        user.FirstName = firstName;
        user.LastName = lastName;
        _userContext.SaveChanges();
    }

    public void UpdateUserTrainingStatus(User user, PreparingStatus preparingStatus)
    {
        user.TrainingStatus = preparingStatus;
        _userContext.SaveChanges();
    }

    public List<UserWithIdDto> GetAllCoachesPrescribedUsers(Guid id)
    {
        return _userContext.Users.Where(u => u.SubscriptionForCoach.CoachId == id).Select(x => new UserWithIdDto 
        { 
            Id = x.Id,
            FirstName = x.FirstName,
            LastName = x.LastName,
            Mail = x.Email 
        }).ToList();
    }
}
