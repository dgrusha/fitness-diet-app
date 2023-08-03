using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Services.Authentication.Common;

namespace FitnessApp.Application.Services.Authentication.Queries
{
    public interface IAuthenticationQueryService
    {

        AuthenticationResult Login(string email, string password);

    }
}
