using System.Net;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Contracts.UniqueResponse;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.Queries.RefreshConnection;
public class RefreshConnectionQueryHandler : IRequestHandler<RefreshConnectionQuery, UniqueResponse<AuthenticationResult>>
{

    private readonly IUserRepository _userRepository;

    public RefreshConnectionQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UniqueResponse<AuthenticationResult>> Handle(RefreshConnectionQuery query, CancellationToken cancellationToken)
    {
        var response = new UniqueResponse<AuthenticationResult>();

        try
        {
            if (_userRepository.GetUserById(query.Id) is not User user)
            {
                response.Errors.Add("User with this id does not exist");
                response.ErrorCode = (int)HttpStatusCode.BadRequest;
                return response;
            };

            response.Data = new AuthenticationResult(
                Guid.NewGuid(),
                user.LastName,
                user.FirstName,
                user.Email,
                user.IsAdmin,
                user.HasObligatoryForm,
                query.Token,
                user.SubscriptionForCoach != null
            );

            response.ErrorCode = (int)HttpStatusCode.OK;
            return response;
        }
        catch (Exception ex)
        {
            response.Errors.Add(ex.Message);
            response.ErrorCode = (int)HttpStatusCode.InternalServerError;
        }
        return response;
    }
}

