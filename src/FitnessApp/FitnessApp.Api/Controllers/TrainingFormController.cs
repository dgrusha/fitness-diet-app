using System.Security.Claims;
using FitnessApp.Application.Common.TrainingForm;
using FitnessApp.Application.TrainingForm.Commands.AddTrainingForm;
using FitnessApp.Application.TrainingMode.Queries.GetAllTrainingModes;
using FitnessApp.Contracts.TrainingForm;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("trainingForm")]
    [ApiController]
    [Authorize]
    public class TrainingFormController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TrainingFormController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getAllOptions")]
        public async Task<IActionResult> GetAllOptions()
        {
            var response = new UniqueResponse<GetAllTrainingOptionsResponse>();
            GetAllTrainingOptionsResponse optionsResponse = new GetAllTrainingOptionsResponse();
            var queryTrainingMode = new GetAllTrainingModesQuery();

            try
            {
                optionsResponse.trainingModes = await _mediator.Send(queryTrainingMode);
            }
            catch (Exception)
            {
                response.ErrorCode = 400;
                response.Errors.Add("Internal server fetch error");
                return Ok(response);
            }

            response.ErrorCode = 200;
            response.Data = optionsResponse;
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Post(AddTrainingFormRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new AddTrainingFormCommand(new Guid(userId), new Guid(request.TrainingMode), request.Days);
            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
