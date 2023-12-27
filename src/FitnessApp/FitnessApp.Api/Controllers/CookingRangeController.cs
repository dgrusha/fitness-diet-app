using System.Security.Claims;
using FitnessApp.Application.CookingRange.Commands.AddCookingRange;
using FitnessApp.Contracts.CookingRange;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("cookingRange")]
    [ApiController]
    [Authorize]
    public class CookingRangeController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public CookingRangeController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpPost("add")]
        public void Post(AddCookingRangeRequest addCookingRangeRequest, string passEdit)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            string? pass = _configuration.GetValue<string>("Editing:Pass");
            if (pass != null && !pass.Equals(passEdit))
            {
                return;
            }

            var command = new AddCookingRangeCommand(new Guid(userId), addCookingRangeRequest.Name, addCookingRangeRequest.MinuteStart, addCookingRangeRequest.MinuteEnd);
            _mediator.Send(command);

        }
    }
}
