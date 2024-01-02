using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace FitnessApp.Application.UserProfile.Queries.GetChatInterlocutor;

public class GetChatInterlocutorQueryHandler : IRequestHandler<GetChatInterlocutorQuery, UniqueResponse<GetChatInterlocuterResult>>
{
    private readonly IUserRepository _userRepository;
    private readonly ICoachRepository _coachRepository;
    private readonly ISubscriptionRepository _subscriptionRepository;

    public GetChatInterlocutorQueryHandler(IUserRepository userRepository, ICoachRepository coachRepository, ISubscriptionRepository subscriptionRepository)
    {
        _userRepository = userRepository;
        _coachRepository = coachRepository;
        _subscriptionRepository = subscriptionRepository;
    }

    public async Task<UniqueResponse<GetChatInterlocuterResult>> Handle(GetChatInterlocutorQuery request, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<GetChatInterlocuterResult>();

        try
        {
            if (_userRepository.GetUserById(request.userId) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            List<ChatInterlocuterDto> chatInterlocuters = new List<ChatInterlocuterDto>();


            if (user.Coach != null)
            {
                IEnumerable<Subscription>? subscribedClients = _subscriptionRepository.GetSubscriptionsOfClients(user.Coach.Id);
                foreach (Subscription subscription in subscribedClients) 
                {
                    chatInterlocuters.Add(new ChatInterlocuterDto(
                        subscription.Client.FirstName,
                        subscription.Client.LastName,
                        subscription.Client.Email,
                        subscription.Client.AvatarFileName));
                }
            }
            else
            {
                if (user.SubscriptionForCoach == null) 
                {
                    response.Errors.Add("Client doesn't have subscription for coach yet");
                    response.ErrorCode = (int)HttpStatusCode.BadRequest;
                    return response;
                }
                Subscription? subscriptionForCoach = _subscriptionRepository.GetSubscriptionForCoach(user.Id);

                Coach? coach = _coachRepository.GetCoachById(subscriptionForCoach.CoachId);

                chatInterlocuters.Add(new ChatInterlocuterDto(
                    coach.User.FirstName,
                    coach.User.LastName,
                    coach.User.Email,
                    coach.User.AvatarFileName));
            }

            response.Data = new GetChatInterlocuterResult(
                chatInterlocuters
            );
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
