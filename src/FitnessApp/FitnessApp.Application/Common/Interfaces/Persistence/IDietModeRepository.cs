using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface IDietModeRepository
{
    void Add(Domain.Entities.DietMode mode);
    void Update(Guid id, Domain.Entities.DietMode mode);
    void Delete(Guid id);
    Domain.Entities.DietMode? GetById(Guid id);
    HashSet<DietModeDto> GetAll();
}
