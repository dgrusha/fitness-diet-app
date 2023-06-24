using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Interfaces.Authentication;
public interface ITokenGenerator
{

    string GenerateToken(Guid guid, string email);

}
