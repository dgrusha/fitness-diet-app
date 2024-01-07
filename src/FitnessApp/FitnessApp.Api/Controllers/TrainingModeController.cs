using FitnessApp.Application.TrainingMode.Commands.AddTrainingMode;
using FitnessApp.Contracts.TrainingMode;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("trainingMode")]
    [ApiController]
    [Authorize]
    public class TrainingModeController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public TrainingModeController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpPost("add")]
        public void Post(AddTrainingModeRequest addTrainingModeRequest, string passEdit)
        {
            string? pass = _configuration.GetValue<string>("Editing:Pass");
            if (pass != null && !pass.Equals(passEdit))
            {
                return;
            }

            var command = new AddTrainingModeCommand(addTrainingModeRequest.Name);

            _mediator.Send(command);
        }
    }
}
