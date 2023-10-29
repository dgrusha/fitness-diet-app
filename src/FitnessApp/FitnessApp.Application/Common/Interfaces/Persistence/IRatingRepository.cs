using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IRatingRepository
{

    void Add(Rating rating);

}
