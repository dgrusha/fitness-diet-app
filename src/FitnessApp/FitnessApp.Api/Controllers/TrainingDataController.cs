using System.Security.Claims;
using FitnessApp.Application.TrainingData.Queries.GetTrainingData;
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
    }
}
