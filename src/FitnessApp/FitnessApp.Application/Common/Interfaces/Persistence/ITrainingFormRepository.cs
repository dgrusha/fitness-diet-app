using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface ITrainingFormRepository
{
    void Add(Domain.Entities.TrainingForm form);
    void Update(Guid id, Domain.Entities.TrainingForm form);
    List<Domain.Entities.TrainingForm> GetNotStartedTrainingForms();
    Domain.Entities.TrainingForm? GetTrainingFormByUserId(Guid id);
}
