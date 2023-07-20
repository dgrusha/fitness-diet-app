using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Authentication;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using Dumpify;

namespace FitnessApp.Application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {

        private readonly ITokenGenerator _tokenGenerator;
        private readonly IUserRepository _userRepository;

        public AuthenticationService(ITokenGenerator tokenGenerator, IUserRepository userRepository)
        {
            _tokenGenerator = tokenGenerator;
            _userRepository = userRepository;
        }

        public AuthenticationResult Login(string email, string password)
        {
            if (_userRepository.GetUserByEmail(email) is not User user)
            {
                throw new Exception("User with this email does not exist");
            };

            if (!PasswordHandler.IsVerified(user.Password, password))
            {
                throw new Exception("Invalid password");
            }

            var token = _tokenGenerator.GenerateToken(user.Id, user.Email);

            return new AuthenticationResult(
                Guid.NewGuid(),
                user.LastName,
                user.FirstName,
                email,
                token
            );
        }

        public AuthenticationResult Register(string firstName, string lastName, string email, string password)
        {
            if (_userRepository.GetUserByEmail(email) is not null) 
            {
                throw new Exception("User with this email already exists");
            };

            var user = new User 
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = PasswordHandler.HashPassword(password)
            };

            _userRepository.Add(user);
            user.Dump();
            var token = _tokenGenerator.GenerateToken(user.Id, email);

            return new AuthenticationResult(
                user.Id,
                firstName,
                lastName,
                email,
                token
            );
        }
    }
}
