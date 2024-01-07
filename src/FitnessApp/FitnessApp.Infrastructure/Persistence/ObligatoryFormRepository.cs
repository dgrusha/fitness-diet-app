using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FitnessApp.Infrastructure.Persistence;
public class ObligatoryFormRepository : IObligatoryFormRepository
{

    private readonly FitnessContext _formContext;

    public ObligatoryFormRepository(FitnessContext formContext)
    {
        _formContext = formContext;
    }


    public void Add(ObligatoryForm obligatoryForm)
    {
        _formContext.Add(obligatoryForm);
        _formContext.SaveChanges();
    }

    public void Delete(Guid id)
    {
        var form = _formContext.ObligatoryForms.SingleOrDefault(form => form.UserId == id);
        if (form != null) 
        {
            _formContext.ObligatoryForms.Remove(form);
            _formContext.SaveChanges();
        }
    }

    public HashSet<ObligatoryForm>? GetAllForms()
    {
        return _formContext.ObligatoryForms.ToHashSet();
    }

    public ObligatoryForm? GetFormById(Guid id)
    {
        return _formContext.ObligatoryForms
            .Include(u => u.Allergies)
            .FirstOrDefault(u => u.UserId == id);
    }

    public void Update(ObligatoryForm obligatoryForm)
    {
        var form = _formContext.ObligatoryForms.SingleOrDefault(form => form.UserId == obligatoryForm.UserId);
        if (form != null) 
        {
            form.Weight = obligatoryForm.Weight;
            form.Weight = obligatoryForm.Height;
            _formContext.SaveChanges();
        }
    }
}
