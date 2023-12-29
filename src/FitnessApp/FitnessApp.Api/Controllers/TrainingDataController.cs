using System.Security.Claims;
using FitnessApp.Application.TrainingData.Commands.UpdateTrainingDataByCoach;
using FitnessApp.Application.TrainingData.Queries.GetTrainingData;
using FitnessApp.Application.UserProfile.Queries.DoesUserHasCoach;
using FitnessApp.Contracts.CoachClientManagement;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("trainingData")]
    [ApiController]
    [Authorize]
    public class TrainingDataController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TrainingDataController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getTrainingData")]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new GetTrainingDataQuery(new Guid(userId));
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpGet("getTrainingDataByCoach")]
        public async Task<IActionResult> GetDataByCoach([FromQuery] GetUserDataByCoachRequest request)
        {
            var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new DoesUserHasCoachQuery(new Guid(request.userId), new Guid(coachId));
            var result = await _mediator.Send(query);

            if (result == false)
            {
                return Ok(new UniqueResponse<string> { ErrorCode = 400, Errors = new List<string> { "This coach does not have such a user." } });
            }

            var queryData = new GetTrainingDataQuery(new Guid(request.userId));
            var resultData = await _mediator.Send(queryData);

            return Ok(resultData);
        }

        [HttpPut("updateTrainingDataByCoach")]
        public async Task<IActionResult> UpdateTrainingByCoach([FromForm] UpdateTrainingDataByCoachRequest request)
        {
            var coachId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var queryData = new UpdateTrainingDataByCoachCommand(new Guid(coachId), new Guid(request.UserId), new Guid(request.ExerciseId), request.Text);
            var resultData = await _mediator.Send(queryData);

            return StatusCode((int)resultData.StatusCode, await resultData.Content.ReadAsStringAsync());
        }
    }
}
