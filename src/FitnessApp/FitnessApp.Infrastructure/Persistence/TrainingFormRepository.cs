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
public class TrainingFormRepository : ITrainingFormRepository
{
    private readonly FitnessContext _trainingFormContext;

    public TrainingFormRepository(FitnessContext trainingFormContext)
    {
        _trainingFormContext = trainingFormContext;
    }

    public void Add(TrainingForm form)
    {
        _trainingFormContext.TrainingForms.Add(form);
        _trainingFormContext.SaveChanges();
    }

    public List<TrainingForm> GetNotStartedTrainingForms()
    {
        return _trainingFormContext.TrainingForms
            .Include(x => x.TrainingMode)
            .Include(x=> x.User)
            .Where(x => x.User.TrainingStatus == PreparingStatus.ToTake)
            .ToList();
    }

    public TrainingForm? GetTrainingFormByUserId(Guid id)
    {
        return _trainingFormContext.TrainingForms
            .Include(x => x.TrainingMode)
            .Include(x => x.User)
            .FirstOrDefault(x => x.UserId == id);
    }

    public void Update(Guid id, TrainingForm form)
    {
        var formFromDb = _trainingFormContext.TrainingForms.SingleOrDefault(form => form.Id == id);
        if (formFromDb != null)
        {
            formFromDb.TrainingMode = form.TrainingMode;
            formFromDb.Days = form.Days;
            _trainingFormContext.SaveChanges();
        }
    }
}
