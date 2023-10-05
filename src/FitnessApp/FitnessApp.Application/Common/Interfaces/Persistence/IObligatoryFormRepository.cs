using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IObligatoryFormRepository
{

    HashSet<ObligatoryForm>? GetAllForms();
    void Add(ObligatoryForm obligatoryForm);
    void Update(ObligatoryForm obligatoryForm);
    void Delete(Guid id);

}
