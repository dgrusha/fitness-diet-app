using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Authentication;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using Dumpify;
using FitnessApp.Application.Services.Authentication.Common;

namespace FitnessApp.Application.Services.Authentication.Commands
{
    public class AuthenticationCommandService : IAuthenticationCommandService
    {

        private readonly ITokenGenerator _tokenGenerator;
        private readonly IUserRepository _userRepository;

        public AuthenticationCommandService(ITokenGenerator tokenGenerator, IUserRepository userRepository)
        {
            _tokenGenerator = tokenGenerator;
            _userRepository = userRepository;
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
