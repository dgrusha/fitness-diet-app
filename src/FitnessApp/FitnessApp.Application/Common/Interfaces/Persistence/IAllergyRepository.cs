using System;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;

public interface IAllergyRepository
{

    HashSet<FitnessApp.Domain.Entities.Allergy>? GetAllAlergies();
    void Add(FitnessApp.Domain.Entities.Allergy allergy);
    void Update(Guid id, FitnessApp.Domain.Entities.Allergy allergy);
    void Delete(Guid id);
    FitnessApp.Domain.Entities.Allergy? GetAllergyByName(string name);
    FitnessApp.Domain.Entities.Allergy? GetAllergyByAllParameters(string name, string classAllergy, string typeAllergy, string groupAllergy, string foodAllergy);
    FitnessApp.Domain.Entities.Allergy? GetAllergyById(Guid id);

}
