using System.Security.Claims;
using FitnessApp.Application.UserProfile.Commands.UpdateUserInformation;
using FitnessApp.Application.UserProfile.Queries.GetUserInformation;
using FitnessApp.Contracts.UserProfile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("userProfile")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getUser")]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new GetUserInformationQuery(new Guid(userId));

            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpPut("updatedUser")]
        public async Task<IActionResult> Update(UpdateUserInfoRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new UpdateUserInformationCommand(new Guid(userId), request.FirstName, request.LastName);

            var result = await _mediator.Send(command);

            return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
        }
    }
}
