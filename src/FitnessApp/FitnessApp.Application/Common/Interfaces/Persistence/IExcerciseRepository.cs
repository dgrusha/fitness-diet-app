using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IExcerciseRepository
{
    void Add(Excercise excercise);
    void Update(Guid id, Excercise excercise);
    void DeleteExcerciseByIdOfTrainingForm(Guid id);
    List<ExcerciseDto> GetTrainingExcercises(Guid trainingFormId);
}
