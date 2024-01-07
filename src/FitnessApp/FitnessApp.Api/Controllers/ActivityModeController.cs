using System.Security.Claims;
using FitnessApp.Application.ActivityMode.Commands.AddActivityMode;
using FitnessApp.Contracts.ActivityMode;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("activityMode")]
    [ApiController]
    [Authorize]
    public class ActivityModeController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public ActivityModeController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpPost("add")]
        public void Post(AddActivityModeRequest addActivityModeRequest, string passEdit)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            string? pass = _configuration.GetValue<string>("Editing:Pass");
            if (pass != null && !pass.Equals(passEdit))
            {
                return;
            }

            var command = new AddActivityModeCommand(new Guid(userId), addActivityModeRequest.Name, addActivityModeRequest.Coeficient);

            _mediator.Send(command);
        }
    }
}
