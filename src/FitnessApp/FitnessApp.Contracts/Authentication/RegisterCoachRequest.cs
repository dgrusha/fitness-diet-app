using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FitnessApp.Contracts.Authentication;

public record RegisterCoachRequest
(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string Text,
    IFormFile File
);

