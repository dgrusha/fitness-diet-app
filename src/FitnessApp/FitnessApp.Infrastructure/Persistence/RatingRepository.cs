using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class RatingRepository : IRatingRepository
{

    private readonly FitnessContext _ratingContext;

    public RatingRepository(FitnessContext ratingContext)
    {
        _ratingContext = ratingContext;
    }

    public void Add(Rating rating)
    {
        _ratingContext.Ratings.Add(rating);
        _ratingContext.SaveChanges();
    }
}
