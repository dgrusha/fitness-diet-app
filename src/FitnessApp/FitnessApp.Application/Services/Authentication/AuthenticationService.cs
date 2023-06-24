using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Authentication;

namespace FitnessApp.Application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {

        private readonly ITokenGenerator _tokenGenerator;

        public AuthenticationService(ITokenGenerator tokenGenerator)
        {
            _tokenGenerator = tokenGenerator;
        }

        public AuthenticationResult Login(string email, string password)
        {
            return new AuthenticationResult(
                Guid.NewGuid(),
                "ln",
                "fn",
                email,
                "token"
            );
        }

        public AuthenticationResult Register(string firstName, string lastName, string email, string password)
        {
            Guid id = Guid.NewGuid();

            var token = _tokenGenerator.GenerateToken(id, email);

            return new AuthenticationResult(
                id,
                firstName,
                lastName,
                email,
                token
            );
        }
    }
}
