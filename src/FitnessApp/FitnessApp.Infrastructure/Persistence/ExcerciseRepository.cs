using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class ExcerciseRepository : IExcerciseRepository
{
    private readonly FitnessContext _excerciseContext;

    public ExcerciseRepository(FitnessContext excerciseContext)
    {
        _excerciseContext = excerciseContext;
    }

    public void Add(Excercise excercise)
    {
        _excerciseContext.Excercises.Add(excercise);
        _excerciseContext.SaveChanges();
    }

    public void DeleteExcerciseByIdOfTrainingForm(Guid id)
    {
        var excerciseList = _excerciseContext.Excercises.Where(x => x.TrainingFormId == id).ToList();
        _excerciseContext.RemoveRange(excerciseList);
        _excerciseContext.SaveChanges();
    }

    public List<ExcerciseDto> GetTrainingExcercises(Guid trainingFormId)
    {
        return _excerciseContext.Excercises
            .Where(x => x.TrainingFormId == trainingFormId).Select(x => new ExcerciseDto 
            { 
                Id = x.Id,
                Name = x.Name,
                Muscle = x.Muscle,
                Part = x.Part,
                Instructions = x.Instructions,
                Difficulty = x.Difficulty,
                Day = x.Day,
                Comment = x.Comment,
                FileName = x.FileName
            })
            .ToList();
    }

    public void Update(Guid id, Excercise excercise)
    {
        var excerciseFromDb = _excerciseContext.Excercises.SingleOrDefault(x => x.Id == id);
        if (excerciseFromDb != null) 
        {
            excerciseFromDb.Comment = excercise.Comment;
            excerciseFromDb.FileName = excerciseFromDb.FileName;
        }
    }
}
