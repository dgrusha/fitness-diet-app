using System.Security.Claims;
using FitnessApp.Application.DietData.Queries.GetDietData;
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
    }
}
