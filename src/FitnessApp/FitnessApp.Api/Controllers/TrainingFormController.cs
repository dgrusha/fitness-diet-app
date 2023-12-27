using System.Security.Claims;
using FitnessApp.Application.Common.TrainingForm;
using FitnessApp.Application.TrainingForm.Commands.AddTrainingForm;
using FitnessApp.Application.TrainingForm.Commands.GenerateTrainingFile;
using FitnessApp.Application.TrainingForm.Commands.UpdateTrainingForm;
using FitnessApp.Application.TrainingForm.Queries.GetUserChociesFormTraining;
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

        [HttpGet("getAllWithUserChoicesOptions")]
        public async Task<IActionResult> GetAllWitUserOptions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = new UniqueResponse<GetAllTrainingFormOptionsResponeAndUserChoices>();
            GetAllTrainingFormOptionsResponeAndUserChoices optionsResponse = new GetAllTrainingFormOptionsResponeAndUserChoices();
            var queryTrainingMode = new GetAllTrainingModesQuery();

            var queryUserOptions = new GetUserChociesFormTrainingQuery(new Guid(userId));

            var userTrainingFormOptions = await _mediator.Send(queryUserOptions);
            if (userTrainingFormOptions.ErrorCode != 200)
            {
                response.ErrorCode = userTrainingFormOptions.ErrorCode;
                response.Errors.AddRange(userTrainingFormOptions.Errors);
                return Ok(response);
            }
            try
            {
                optionsResponse.trainingModes = await _mediator.Send(queryTrainingMode);
                optionsResponse.trainingMode = userTrainingFormOptions.Data.trainingMode;
                optionsResponse.days = userTrainingFormOptions.Data.days;
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

        [HttpPut("update")]
        public async Task<IActionResult> Put(AddTrainingFormRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new UpdateTrainingFormCommand(new Guid(userId), new Guid(request.TrainingMode), request.Days);
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPost("requestGenerateFile")]
        public async Task<IActionResult> PostGenerateFile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new GenerateTrainingFileCommand(new Guid(userId));
            var result = await _mediator.Send(command);

            return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
        }
    }
}
