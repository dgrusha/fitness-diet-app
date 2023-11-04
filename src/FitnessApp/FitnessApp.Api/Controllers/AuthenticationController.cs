using FitnessApp.Contracts.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using FitnessApp.Application.Commands.Register;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Application.Queries;
using FitnessApp.Application.S3Bucket.Commands.AddFile;
using FitnessApp.Application.Authentication.Commands.RegisterCoach;
using FitnessApp.Contracts.UniqueResponse;

namespace FitnessApp.Api.Controllers
{
    [Route("auth")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {

        private readonly IMediator _mediator;

        public AuthenticationController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            var command = new RegisterCommand(
                registerRequest.FirstName,
                registerRequest.LastName,
                registerRequest.Email,
                registerRequest.Password);

            UniqueResponse<AuthenticationResult> authResult = await _mediator.Send(command);

            return Ok(authResult);
        }

        [HttpPost("registerCoach")]
        public async Task<IActionResult> RegisterCoach([FromForm] RegisterCoachRequest registerRequest)
        {

            string filePath = $"cv/{registerRequest.Email}{Path.GetExtension(registerRequest.File.FileName)}";
            var commandUpload = new AddFileCommand
                    (
                        registerRequest.File,
                        "fitnessdietbucket",
                        filePath
                    );
            var resultUpload = await _mediator.Send(commandUpload);

            var command = new RegisterCoachCommand(
                registerRequest.FirstName,
                registerRequest.LastName,
                registerRequest.Email,
                registerRequest.Password,
                registerRequest.Text,
                filePath
            );

            UniqueResponse<AuthenticationResult> authResult = await _mediator.Send(command);

            return Ok(authResult);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var query = new LoginQuery(
                loginRequest.Email,
                loginRequest.Password);

            UniqueResponse<AuthenticationResult> authResult = await _mediator.Send(query);

            return Ok(authResult);
        }
    }
}
