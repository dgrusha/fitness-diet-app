using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Services.Authentication.Common;

public record AuthenticationResult
(
    Guid id,
    string FirstName,
    string LastName,
    string Email,
    bool IsAdmin,
    bool HasObligatoryForm,
    string Token,
    bool HasSubscription,
    bool IsCoach
);
