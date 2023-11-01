using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class CoachRepository : ICoachRepository
{

    private readonly FitnessContext _coachContext;

    public CoachRepository(FitnessContext coachContext)
    {
        _coachContext = coachContext;
    }

    public void Add(Coach coach)
    {
        _coachContext.Coaches.Add(coach);
        _coachContext.SaveChangesAsync();
    }
}
