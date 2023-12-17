using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Domain.Entities;
public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? AvatarFileName { get; set; }

    public bool HasObligatoryForm { get; set; } = false;

    // One relations

    public ObligatoryForm? ObligatoryForm { get; set; }
    public DietForm? DietForm { get; set; }
    public Coach? Coach { get; set; }

    // Statuses
    public PreparingStatus DietStatus { get; set; } = PreparingStatus.NotStarted;
    public PreparingStatus TrainingStatus { get; set; } = PreparingStatus.NotStarted;

    // Many relations

    public ICollection<Conversation> Conversations1 { get; set; } = new List<Conversation>();
    public ICollection<Conversation> Conversations2 { get; set; } = new List<Conversation>();
    public ICollection<Message> SentMessages { get; set; } = new List<Message>();
    public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
}


public enum PreparingStatus
{
    NotStarted,
    InProgress,
    Finished,
    ToTake,
    NotSuceeded
}