using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.UserProfile;
public record GetUserProfileStatuses
(
    PreparingStatus DietStatus,
    PreparingStatus TrainingStatus
);
