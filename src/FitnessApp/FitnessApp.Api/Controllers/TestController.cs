using FitnessApp.Application.S3Bucket.Commands.DeleteFile;
using FitnessApp.Application.S3Bucket.Queries.GetFile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("test")]
    [ApiController]
    [Authorize]
    public class TestController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TestController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("testauth")]
        public async Task<IActionResult> TestaAuth()
        {
            return Ok("worked");
        }


    }
}
