using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.CookingRange.Commands.AddCookingRange;
public class AddCookingRangeCommandHandler : IRequestHandler<AddCookingRangeCommand, HttpResponseMessage>
{
    private readonly IUserRepository _userRepository;
    private readonly ICookingRangeRepository _cookingRangeRepository;

    public AddCookingRangeCommandHandler(IUserRepository userRepository, ICookingRangeRepository cookingRangeRepository)
    {
        _userRepository = userRepository;
        _cookingRangeRepository = cookingRangeRepository;
    }

    public async Task<HttpResponseMessage> Handle(AddCookingRangeCommand request, CancellationToken cancellationToken)
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
            if (request.Name.Length == 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Name cannot be empty"),
                };
            }
            if (request.MinuteStart <= 0 || request.MinuteEnd <= 10 || request.MinuteStart > request.MinuteEnd)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Time range is set incorrectly"),
                };
            }
            Domain.Entities.CookingRange cookingRange = new Domain.Entities.CookingRange
            {
                Name = request.Name,
                MinuteStart = request.MinuteStart,
            };
            _cookingRangeRepository.Add(cookingRange);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Cooking range was added successfully"),
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
