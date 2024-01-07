using System.Security.Claims;
using FitnessApp.Application.DietData.Commands.UpdateDietDataByCoach;
using FitnessApp.Application.DietData.Queries.GetDietData;
using FitnessApp.Application.UserProfile.Queries.DoesUserHasCoach;
using FitnessApp.Contracts.CoachClientManagement;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("dietData")]
    [ApiController]
    [Authorize]
    public class DietDataController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DietDataController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("getDietData")]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new GetDietDataQuery(new Guid(userId));
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpGet("getDietDataByCoach")]
        public async Task<IActionResult> GetDataByCoach([FromQuery] GetUserDataByCoachRequest request) 
        {
            var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new DoesUserHasCoachQuery(new Guid(request.userId), new Guid(coachId));
            var result = await _mediator.Send(query);

            if (result == false) 
            {
                return Ok(new UniqueResponse<string> { ErrorCode = 400, Errors = new List<string> { "This coach does not have such a user." } });
            }

            var queryData = new GetDietDataQuery(new Guid(request.userId));
            var resultData = await _mediator.Send(queryData);

            return Ok(resultData);
        }

        [HttpPut("updateDietDataByCoach")]
        public async Task<IActionResult> UpdateDataByCoach(UpdateDietDataByCoachRequest request)
        {
            var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var queryData = new UpdateDietDataByCoachCommand(new Guid(coachId), new Guid(request.userId), new Guid(request.recipeId), request.text);
            var resultData = await _mediator.Send(queryData);

            return StatusCode((int)resultData.StatusCode, await resultData.Content.ReadAsStringAsync());
        }
    }
}
