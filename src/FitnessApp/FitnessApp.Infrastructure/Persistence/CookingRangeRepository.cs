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
public class CookingRangeRepository : ICookingRangeRepository
{
    private readonly FitnessContext _cookingRangeContext;

    public CookingRangeRepository(FitnessContext cookingRangeContext)
    {
        _cookingRangeContext = cookingRangeContext;
    }

    public void Add(CookingRange range)
    {
        _cookingRangeContext.CookingRanges.Add(range);
        _cookingRangeContext.SaveChanges();
    }

    public void Delete(Guid id)
    {
        var range = _cookingRangeContext.CookingRanges.SingleOrDefault(range => range.Id == id);
        if (range != null)
        {
            _cookingRangeContext.CookingRanges.Remove(range);
            _cookingRangeContext.SaveChanges();
        }
    }

    public HashSet<CookingRangeDto> GetAll()
    {
        return _cookingRangeContext.CookingRanges
               .Select(c => new CookingRangeDto
               {
                   Id = c.Id,
                   Name = c.Name,
               })
               .ToHashSet();
    }

    public CookingRange? GetById(Guid id)
    {
        CookingRange? range = _cookingRangeContext.CookingRanges.SingleOrDefault(mode => mode.Id == id);
        return range;
    }

    public void Update(Guid id, CookingRange range)
    {
        var rangeFromDb = _cookingRangeContext.CookingRanges.SingleOrDefault(range => range.Id == id);
        if (rangeFromDb != null)
        {
            rangeFromDb.Name = range.Name;
            rangeFromDb.MinuteStart = range.MinuteStart;
            rangeFromDb.MinuteEnd = range.MinuteEnd;
            _cookingRangeContext.SaveChanges();
        }
    }
}
