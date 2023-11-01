using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Feedback.Commands.LeaveFeedback;
public class LeaveFeedbackCommandHandler : IRequestHandler<LeaveFeedbackCommand, HttpResponseMessage>
{

    private readonly IUserRepository _userRepository;
    private readonly IRatingRepository _ratingRepository;

    public LeaveFeedbackCommandHandler(IUserRepository userRepository, IRatingRepository ratingRepository)
    {
        _userRepository = userRepository;
        _ratingRepository = ratingRepository;
    }

    public async Task<HttpResponseMessage> Handle(LeaveFeedbackCommand request, CancellationToken cancellationToken)
    {
        try 
        {
            var user = _userRepository.GetUserById(request.UserId);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist"),
                };
            }
            if (request.RatingLevel < 0 || request.RatingLevel > 5) 
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Rating cannot be lower than 0 or higher than 5"),
                };
            }
            if (request.Text.Length == 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Feedback cannot be empty"),
                };
            }

            Rating rating = new Rating
            {
                UserId = user.Id,
                RatingLevel = request.RatingLevel,
                Text = request.Text
            };

            _ratingRepository.Add(rating);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Feedback was added successfully"),
            };

        }
        catch (Exception ex)
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent($"An error occurred: {ex.Message}"),
            };
        }
    }
}
