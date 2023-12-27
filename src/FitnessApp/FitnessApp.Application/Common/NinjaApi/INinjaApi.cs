using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.NinjaApi;
public interface INinjaApi
{
    Task<string> GetExcercises(string muscle, FitnessApp.Domain.Entities.TrainingMode trainingMode);
}
