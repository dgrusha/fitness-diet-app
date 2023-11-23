using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IActivityModeRepository
{
    void Add(Domain.Entities.ActivityMode mode);
    void Update(Guid id, Domain.Entities.ActivityMode mode);
    void Delete(Guid id);
    HashSet<ActivityModeDto> GetAll();
}
