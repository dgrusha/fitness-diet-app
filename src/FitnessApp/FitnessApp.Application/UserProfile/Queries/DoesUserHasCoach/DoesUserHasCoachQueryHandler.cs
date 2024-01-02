using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.DoesUserHasCoach;
public class DoesUserHasCoachQueryHandler : IRequestHandler<DoesUserHasCoachQuery, bool>
{
    private readonly IUserRepository _userRepository;

    public DoesUserHasCoachQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<bool> Handle(DoesUserHasCoachQuery request, CancellationToken cancellationToken)
    {
        try
        {
            if (_userRepository.GetUserById(request.coachId) is not User user)
            {
                return false;
            };

            if (user.Coach == null)
            {
                return false;
            };

            List<UserWithIdDto> users = _userRepository.GetAllCoachesPrescribedUsers(user.Coach.Id);

            foreach (var item in users)
            {
                if (item.Id == request.userId) 
                {
                    return true;
                }
            }

            return false;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}
