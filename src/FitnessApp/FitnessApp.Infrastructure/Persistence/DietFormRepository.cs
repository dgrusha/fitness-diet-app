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

    public DietForm? GetDietFormByUserId(Guid id)
    {
        return _dietFormContext.DietForms
            .Include(u => u.User)
            .Include(d => d.Recipes)
            .Include(u => u.CookingRange)
            .Include(u => u.ActivityMode)
            .Include(u => u.DietMode)
            .FirstOrDefault(d => d.UserId == id);
    }

    public List<DietForm> GetNotStartedDietForms()
    {
        return _dietFormContext.DietForms
            .Include(u => u.User)
            .Include(u => u.User.ObligatoryForm)
            .Include(u => u.CookingRange)
            .Include(u => u.ActivityMode)
            .Include(u => u.DietMode)
            .Where(f => f.User.DietStatus == PreparingStatus.ToTake)
            .ToList();
    }

    public void Update(Guid id, DietForm form)
    {
        var formFromDb = _dietFormContext.DietForms.SingleOrDefault(form => form.Id == id);
        if (formFromDb != null)
        {
            formFromDb.ActivityMode = form.ActivityMode;
            formFromDb.DietMode = form.DietMode;
            formFromDb.CookingRange = form.CookingRange;
            formFromDb.GenerateFile = form.GenerateFile;
            _dietFormContext.SaveChanges();
        }
    }
}
