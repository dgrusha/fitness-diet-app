using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.UserProfile;
public record GetUserProfileResult
(
    string FirstName,
    string LastName,
    string Email,
    bool HasObligatoryForm,
    string? AvatarFileName
);
