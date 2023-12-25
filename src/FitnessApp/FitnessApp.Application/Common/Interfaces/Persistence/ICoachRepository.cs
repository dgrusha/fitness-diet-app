using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Domain.Entities;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface ICoachRepository
{

    void Add(Coach coach);

    void UpdateVerified(Coach coach, bool isVerified);

    Coach? GetByUserEmail(string email);
    Coach? GetCoachById(Guid id);

}
