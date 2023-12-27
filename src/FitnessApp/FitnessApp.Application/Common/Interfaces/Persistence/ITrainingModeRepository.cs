using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface ITrainingModeRepository
{
    void Add(Domain.Entities.TrainingMode mode);
    Domain.Entities.TrainingMode? GetById(Guid id);
    HashSet<TrainingModeDto> GetAll();
}
