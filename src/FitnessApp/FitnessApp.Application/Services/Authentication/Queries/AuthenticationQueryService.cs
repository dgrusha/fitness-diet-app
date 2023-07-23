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

namespace FitnessApp.Application.Services.Authentication.Queries
{
    public class AuthenticationQueryService : IAuthenticationQueryService
    {

        private readonly ITokenGenerator _tokenGenerator;
        private readonly IUserRepository _userRepository;

        public AuthenticationQueryService(ITokenGenerator tokenGenerator, IUserRepository userRepository)
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
    }
}
