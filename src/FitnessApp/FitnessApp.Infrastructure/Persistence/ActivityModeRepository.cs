using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class ActivityModeRepository : IActivityModeRepository
{

    private readonly FitnessContext _activityModeContext;

    public ActivityModeRepository(FitnessContext activityModeContext)
    {
        _activityModeContext = activityModeContext;
    }

    public void Add(ActivityMode mode)
    {
        _activityModeContext.ActivityModes.Add(mode);
        _activityModeContext.SaveChanges();
    }

    public void Delete(Guid id)
    {
        var mode = _activityModeContext.ActivityModes.SingleOrDefault(mode => mode.Id == id);
        if (mode != null)
        {
            _activityModeContext.ActivityModes.Remove(mode);
            _activityModeContext.SaveChanges();
        }
    }

    public HashSet<ActivityModeDto> GetAll()
    {
        return _activityModeContext.ActivityModes
            .Select(a => new ActivityModeDto
            {
                Id = a.Id,
                Name = a.Name,
            })
            .ToHashSet();
    }

    public void Update(Guid id, ActivityMode mode)
    {
        var modeFromDb = _activityModeContext.ActivityModes.SingleOrDefault(mode => mode.Id == id);
        if (modeFromDb != null)
        {
            modeFromDb.Coeficient = mode.Coeficient;
            modeFromDb.Name = mode.Name;
            _activityModeContext.SaveChanges();
        }
    }
}
