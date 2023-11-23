using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class DietFormRepository : IDietFormRepository
{
    private readonly FitnessContext _dietFormContext;

    public DietFormRepository(FitnessContext dietFormContext)
    {
        _dietFormContext = dietFormContext;
    }

    public void Add(DietForm form)
    {
        _dietFormContext.DietForms.Add(form);
        _dietFormContext.SaveChanges();
    }

    public void Update(Guid id, DietForm form)
    {
        var formFromDb = _dietFormContext.DietForms.SingleOrDefault(form => form.Id == id);
        if (formFromDb != null)
        {
            formFromDb.ActivityMode = form.ActivityMode;
            formFromDb.DietMode = form.DietMode;
            formFromDb.CookingRange = form.CookingRange;
            _dietFormContext.SaveChanges();
        }
    }
}
