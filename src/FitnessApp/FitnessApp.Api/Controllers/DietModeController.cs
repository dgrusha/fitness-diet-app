using System.Security.Claims;
using FitnessApp.Application.DietMode.Commands.AddDietMode;
using FitnessApp.Contracts.DietMode;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("dietMode")]
    [ApiController]
    [Authorize]
    public class DietModeController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public DietModeController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpPost("add")]
        public void Post(AddDietModeRequest addDietModeRequest, string passEdit)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            string? pass = _configuration.GetValue<string>("Editing:Pass");
            if (pass != null && !pass.Equals(passEdit))
            {
                return;
            }

            var command = new AddDietModeCommand(new Guid(userId), addDietModeRequest.Name, addDietModeRequest.Coeficient);

            _mediator.Send(command);
        }
    }
}
