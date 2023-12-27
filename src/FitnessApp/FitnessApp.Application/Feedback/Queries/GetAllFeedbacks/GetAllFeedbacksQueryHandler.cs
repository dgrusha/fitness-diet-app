using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dumpify;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;
using Newtonsoft.Json;

namespace FitnessApp.Application.Feedback.Queries.GetAllFeedbacks;
public class GetAllFeedbacksQueryHandler : IRequestHandler<GetAllFeedbacksQuery, string>
{
    private readonly IRatingRepository _ratingRepository;
    private readonly IUserRepository _userRepository;

    public GetAllFeedbacksQueryHandler(IRatingRepository ratingRepository, IUserRepository userRepository)
    {
        _ratingRepository = ratingRepository;
        _userRepository = userRepository;
    }

    public async Task<string> Handle(GetAllFeedbacksQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserById(request.UserId);

            if (user == null)
            {
                return await Task.FromResult("[]");
            }
            if (user.IsAdmin == false)
            {
                return await Task.FromResult("[]");
            }

            var feedbacks = _ratingRepository.GetAllRatings();

            if (feedbacks == null || feedbacks.Count == 0)
            {
                return await Task.FromResult("[]");
            }
            Console.WriteLine("hjgdjhgdjw");

            feedbacks.Dump();

            var jsonResult = JsonConvert.SerializeObject(feedbacks, Formatting.Indented);

            return await Task.FromResult(jsonResult);
        }
        catch (Exception ex) { 
            Console.WriteLine(ex.ToString());
            return await Task.FromResult("empty");
        }
        
    }
}
