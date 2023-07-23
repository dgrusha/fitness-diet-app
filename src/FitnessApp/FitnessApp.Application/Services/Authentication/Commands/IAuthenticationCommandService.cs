using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Services.Authentication.Common;

namespace FitnessApp.Application.Services.Authentication.Commands
{
    public interface IAuthenticationCommandService
    {

        AuthenticationResult Register(string firstName, string lastName, string email, string password);

    }
}
