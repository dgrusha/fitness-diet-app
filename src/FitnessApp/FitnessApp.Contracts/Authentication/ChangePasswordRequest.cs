using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.Authentication;
public record ChangePasswordRequest
(
    string Email,
    string Code,
    string Password1, 
    string Password2
);
