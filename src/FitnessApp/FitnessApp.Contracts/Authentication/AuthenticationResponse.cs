using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.Authentication;

public record AuthenticationResponse
(
    Guid id,
    string Email,
    bool hasObligatoryForm,
    string Token
);
