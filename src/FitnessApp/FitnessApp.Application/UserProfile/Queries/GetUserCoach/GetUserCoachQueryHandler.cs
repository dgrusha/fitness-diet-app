using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace FitnessApp.Application.UserProfile.Queries.GetUserCoach;
public class GetUserCoachQueryHandler : IRequestHandler<GetUserCoachQuery, UniqueResponse<CoachDto>>
{
    private readonly IUserRepository _userRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;
    private readonly ICoachRepository _coachRepository;

    public GetUserCoachQueryHandler(IUserRepository userRepository, ISubscriptionRepository subscriptionRepository, ICoachRepository coachRepository)
    {
        _userRepository = userRepository;
        _coachRepository = coachRepository;
        _subscriptionRepository = subscriptionRepository;
    }

    public async Task<UniqueResponse<CoachDto>> Handle(GetUserCoachQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<CoachDto>();

        try
        {
            if (_userRepository.GetUserById(request.Id) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            Subscription? subscription = _subscriptionRepository.GetSubscription(user.Id);

            if (subscription == null)
            {
                response.Errors.Add("User doesn't have subscription yet");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            if (subscription.CoachId == null)
            {
                response.Errors.Add("Subscription doesn't contain coach");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            }

            Coach? coach = _coachRepository.GetCoachById((Guid)subscription.CoachId);

            response.Data = new CoachDto {
                FirstName = coach.User.FirstName,
                LastName = coach.User.LastName,
                Mail = coach.User.Email,
                RecomendationText = coach.RecomendationText,
                CVFileName = coach.CVFileName,
                AvatarFileName = coach.User.AvatarFileName
            };
            response.ErrorCode = (int)HttpStatusCode.OK;
        }
        catch (Exception ex)
        {
            response.Errors.Add(ex.Message);
            response.ErrorCode = (int)HttpStatusCode.InternalServerError;
        }

        return response;
    }
}
