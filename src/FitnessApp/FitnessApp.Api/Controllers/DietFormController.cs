using System.Security.Claims;
using FitnessApp.Application.ActivityMode.Queries.GetAllActivityModes;
using FitnessApp.Application.Common.DietForm;
using FitnessApp.Application.CookingRange.Queries.GetAllCookingRange;
using FitnessApp.Application.DietForm.Commands.AddDietForm;
using FitnessApp.Application.DietForm.Commands.GenerateDietFile;
using FitnessApp.Application.DietForm.Commands.UpdateDietForm;
using FitnessApp.Application.DietForm.Queries.GetUserChoicesFrom;
using FitnessApp.Application.DietMode.Queries.GetAllDietModes;
using FitnessApp.Contracts.DietForm;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("dietForm")]
    [ApiController]
    [Authorize]
    public class DietFormController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DietFormController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getAllOptions")]
        public async Task<IActionResult> GetAllOptions()
        {
            var response = new UniqueResponse<GetAllDietFormOptionsRespone>();
            GetAllDietFormOptionsRespone optionsResponse = new GetAllDietFormOptionsRespone();
            var queryActivity = new GetAllActivityModesQuery();
            var queryDiet = new GetAllDietModesQuery();
            var queryCookingRange = new GetAllCookingRangeQuery();

            try
            {
                optionsResponse.activityModes = await _mediator.Send(queryActivity);
                optionsResponse.dietModes = await _mediator.Send(queryDiet);
                optionsResponse.cookingRanges = await _mediator.Send(queryCookingRange);
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
        public async Task<IActionResult> GetAllWithUserChoices()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = new UniqueResponse<GetAllDietFormOptionsResponeAndUserChoices>();
            GetAllDietFormOptionsResponeAndUserChoices optionsResponse = new GetAllDietFormOptionsResponeAndUserChoices();
            var queryActivity = new GetAllActivityModesQuery();
            var queryDiet = new GetAllDietModesQuery();
            var queryCookingRange = new GetAllCookingRangeQuery();

            var queryUserOptions = new GetUserChoicesFormQuery(new Guid(userId));

            var userDietFormOptions = await _mediator.Send(queryUserOptions);
            if (userDietFormOptions.ErrorCode != 200) 
            {
                response.ErrorCode = userDietFormOptions.ErrorCode;
                response.Errors.AddRange(userDietFormOptions.Errors);
                return Ok(response);
            }
            try
            {
                optionsResponse.activityModes = await _mediator.Send(queryActivity);
                optionsResponse.dietModes = await _mediator.Send(queryDiet);
                optionsResponse.cookingRanges = await _mediator.Send(queryCookingRange);
                optionsResponse.activityMode = userDietFormOptions.Data.activityMode;
                optionsResponse.dietMode = userDietFormOptions.Data.dietMode;
                optionsResponse.cookingRange = userDietFormOptions.Data.cookingRange;
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
        public async Task<IActionResult> Post(AddDietFormRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new AddDietFormCommand(new Guid(userId), new Guid(request.ActivityModeId), new Guid(request.DietModeId), new Guid(request.CookingRangeId));
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put(AddDietFormRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new UpdateDietFormCommand(new Guid(userId), new Guid(request.ActivityModeId), new Guid(request.DietModeId), new Guid(request.CookingRangeId));
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPost("requestGenerateFile")]
        public async Task<IActionResult> PostGenerateFile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new GenerateDietFileCommand(new Guid(userId));
            var result = await _mediator.Send(command);

            return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
        }

    }
}
