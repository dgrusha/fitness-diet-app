using FitnessApp.Application.Common.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.UserProfile;

public record GetAllVerifiedCoachesResult
(
    IEnumerable<CoachDto> verifiedCoaches
);
