using FitnessApp.Application.Allergy.Commands.AddAllergy;
using FitnessApp.Application.Allergy.Commands.DeleteAllergy;
using FitnessApp.Application.Allergy.Commands.UpdateAllergy;
using FitnessApp.Application.Allergy.Queries.GettAllAllergies;
using FitnessApp.Contracts.Allergy;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("allergy")]
    [ApiController]
    [Authorize]
    public class AllergyController : ControllerBase
    {

        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public AllergyController(IMediator mediator, IConfiguration configuration)
        {
            _mediator = mediator;
            _configuration = configuration;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            var query = new GetAllAllergiesQuery();

            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpPost("add")]
        public void Post(AddAllergyRequest addAllergyRequest, string passEdit)
        {
            string? pass = _configuration.GetValue<string>("Editing:Pass");
            if (pass != null && !pass.Equals(passEdit))
            {
                return;
            }

            var command = new AddCommand(
                addAllergyRequest.Name,
                addAllergyRequest.Class,
                addAllergyRequest.Type,
                addAllergyRequest.Group,
                addAllergyRequest.Food
                );

            _mediator.Send(command);
        }

        [HttpPut("update")]
        public void Put(UpdateAllergyRequest updateAllergyRequest, string passEdit)
        {
            string? pass = _configuration.GetValue<string>("Editing:Pass");
            if (pass != null && !pass.Equals(passEdit))
            {
                return;
            }
            var command = new UpdateAllergyCommand(
                    updateAllergyRequest.Name,
                    updateAllergyRequest.Class,
                    updateAllergyRequest.Type,
                    updateAllergyRequest.Group,
                    updateAllergyRequest.Food,
                    updateAllergyRequest.Id
                );

            _mediator.Send(command);
        }

        [HttpDelete("delete")]
        public void Delete(DeleteAllergyRequest deleteAllergyRequest, string passEdit)
        {
            string? pass = _configuration.GetValue<string>("Editing:Pass");
            if (pass != null && !pass.Equals(passEdit))
            {
                return;
            }
            var command = new DeleteAllergyCommand(
                    deleteAllergyRequest.Id
                );

            _mediator.Send(command);
        }
    }
}
