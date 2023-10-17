using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FitnessApp.Contracts.UserProfile;
public record UpdateUserInfoRequest
(
    string FirstName, 
    string LastName,
    IFormFile? Photo
);
