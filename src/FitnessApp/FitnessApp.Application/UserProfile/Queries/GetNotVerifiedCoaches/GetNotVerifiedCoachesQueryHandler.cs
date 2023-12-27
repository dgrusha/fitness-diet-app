using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace FitnessApp.Application.UserProfile.Queries.GetNotVerifiedCoaches;
public class GetNotVerifiedCoachesQueryHandler : IRequestHandler<GetNotVerifiedCoachesQuery, string>
{

    private readonly IUserRepository _userRepository;

    public GetNotVerifiedCoachesQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<string> Handle(GetNotVerifiedCoachesQuery request, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserById(request.UserId) is not User user)
        {
            return await Task.FromResult("[]");
        };

        if (user.IsAdmin == false)
        {
            return await Task.FromResult("[]");
        }

        List<CoachDto> coaches = _userRepository.GetNotVerifiedCoaches();

        if (coaches == null || coaches.Count == 0)
        {
            return await Task.FromResult("[]");
        }

        var jsonResult = JsonConvert.SerializeObject(coaches, Formatting.Indented);

        return await Task.FromResult(jsonResult);
    }
}
