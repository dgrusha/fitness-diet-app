using System.Security.Claims;
using FitnessApp.Application.GetStarted.Commands.AddObligatoryForm;
using FitnessApp.Application.GetStarted.Queries.GetAllObligatoryForm;
using FitnessApp.Contracts.GetStarted;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("obligatoryForm")]
    [ApiController]
    [Authorize]
    public class ObligatoryFormController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ObligatoryFormController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            var query = new GetAllObligatoryFormQuery();
            var result = await _mediator.Send(query);

            return Ok(result); 

        }

        [HttpPost("add")]
        public async Task<IActionResult> Post(AddObligatoryFormRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new AddCommand(new Guid(userId), request.Weight, request.Height, request.Years, request.Allergies);
            var result = await _mediator.Send(command);

            return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
