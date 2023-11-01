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

namespace FitnessApp.Application.UserProfile.Queries.GetAllUsers;
public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, string>
{
    private readonly IUserRepository _userRepository;

    public GetAllUserQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Task<string> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
    {

        if (_userRepository.GetUserById(request.Id) is not User user)
        {
            return Task.FromResult("empty");
        };

        Console.WriteLine(user.FirstName);
        Console.WriteLine(user.Coach);
        List<UserDto> users;
        if (user.Coach != null)
        {
            users = _userRepository.GetAllUsersExceptMe(request.Id);
        }
        else 
        {
            users = _userRepository.GetAllCoachesExceptMe(request.Id);
        }

        Console.WriteLine(users.Count);
        if (users == null || users.Count == 0)
        {
            return Task.FromResult("empty");
        }

        var jsonResult = JsonConvert.SerializeObject(users, Formatting.Indented);

        return Task.FromResult(jsonResult);
    }
}
