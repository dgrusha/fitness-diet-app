using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IDietFormRepository
{
    void Add(Domain.Entities.DietForm form);
    void Update(Guid id, Domain.Entities.DietForm form);
    List<Domain.Entities.DietForm> GetNotStartedDietForms();
    Domain.Entities.DietForm? GetDietFormByUserId(Guid id);
}
