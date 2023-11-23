using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.Interfaces.Persistence;
public interface ICookingRangeRepository
{
    void Add(Domain.Entities.CookingRange range);
    void Update(Guid id, Domain.Entities.CookingRange range);
    void Delete(Guid id);
    HashSet<CookingRangeDto> GetAll();
}
