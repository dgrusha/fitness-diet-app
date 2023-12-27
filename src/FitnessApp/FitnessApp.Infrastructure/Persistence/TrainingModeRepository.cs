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
public class TrainingModeRepository : ITrainingModeRepository
{
    private readonly FitnessContext _trainingModeContext;

    public TrainingModeRepository(FitnessContext trainingModeContext)
    {
        _trainingModeContext = trainingModeContext;
    }

    public void Add(TrainingMode mode)
    {
        _trainingModeContext.TrainingModes.Add(mode);
        _trainingModeContext.SaveChanges();
    }

    public HashSet<TrainingModeDto> GetAll()
    {
        return _trainingModeContext.TrainingModes.
            Select(x => new TrainingModeDto
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToHashSet();
    }

    public TrainingMode? GetById(Guid id)
    {
        TrainingMode? mode = _trainingModeContext.TrainingModes.FirstOrDefault(x => x.Id == id);
        return mode;
    }
}
