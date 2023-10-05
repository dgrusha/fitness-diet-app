using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class AllergyRepository : IAllergyRepository
{

    private readonly FitnessContext _allergyContext;

    public AllergyRepository(FitnessContext allergyContext)
    {
        _allergyContext = allergyContext;
    }

    public void Add(Allergy allergy)
    {
        _allergyContext.Allergies.Add(allergy);
        _allergyContext.SaveChanges();
        
    }

    public void Delete(Guid id)
    {
        var allergy = _allergyContext.Allergies.SingleOrDefault(allergy => allergy.Id == id);
        if (allergy != null)
        {
            _allergyContext.Allergies.Remove(allergy);
            _allergyContext.SaveChanges();
        }
    }

    public HashSet<Allergy>? GetAllAlergies()
    {
        return _allergyContext.Allergies.ToHashSet();
    }

    public Allergy? GetAllergyByAllParameters(string name, string classAllergy, string typeAllergy, string groupAllergy, string foodAllergy)
    {
        Allergy? allergy = _allergyContext.Allergies.SingleOrDefault(allergy => allergy.Name == name 
                                                                    && allergy.Class == classAllergy 
                                                                    && allergy.Type == typeAllergy
                                                                    && allergy.Group == groupAllergy
                                                                    && allergy.Food == foodAllergy
                                                                    );
        return allergy;
    }

    public Allergy? GetAllergyById(Guid id)
    {
        Allergy? allergy = _allergyContext.Allergies.SingleOrDefault(allergy => allergy.Id == id);
        return allergy;
    }

    public Allergy? GetAllergyByName(string name)
    {
        Allergy? allergy = _allergyContext.Allergies.SingleOrDefault(allergy => allergy.Name == name);
        return allergy;
    }

    public void Update(Guid id, Allergy allergy)
    {
        var allergyFromDb = _allergyContext.Allergies.SingleOrDefault(allergy => allergy.Id == id);
        if (allergyFromDb != null) 
        {
            allergyFromDb.Name = allergy.Name;
            allergyFromDb.Class = allergy.Class;
            allergyFromDb.Food = allergy.Food;
            allergyFromDb.Group = allergy.Group;
            allergyFromDb.Type = allergy.Type;
            _allergyContext.SaveChanges();
        }
    }
}
