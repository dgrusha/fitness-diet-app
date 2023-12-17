using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class DietModeRepository : IDietModeRepository
{
    private readonly FitnessContext _dietModeContext;

    public DietModeRepository(FitnessContext dietModeContext)
    {
        _dietModeContext = dietModeContext;
    }

    public void Add(DietMode mode)
    {
        _dietModeContext.DietModes.Add(mode);
        _dietModeContext.SaveChanges();
    }

    public void Delete(Guid id)
    {
        var mode = _dietModeContext.DietModes.SingleOrDefault(mode => mode.Id == id);
        if (mode != null)
        {
            _dietModeContext.DietModes.Remove(mode);
            _dietModeContext.SaveChanges();
        }
    }

    public HashSet<DietModeDto> GetAll()
    {
        return _dietModeContext.DietModes
               .Select(d => new DietModeDto
               {
                   Id = d.Id,
                   Name = d.Name,
               })
               .ToHashSet();
    }

    public DietMode? GetById(Guid id)
    {
        DietMode? mode = _dietModeContext.DietModes.SingleOrDefault(mode => mode.Id == id);
        return mode;
    }

    public void Update(Guid id, DietMode mode)
    {
        var modeFromDb = _dietModeContext.DietModes.SingleOrDefault(mode => mode.Id == id);
        if (modeFromDb != null)
        {
            modeFromDb.Coeficient = mode.Coeficient;
            modeFromDb.Name = mode.Name;
            _dietModeContext.SaveChanges();
        }
    }
}
