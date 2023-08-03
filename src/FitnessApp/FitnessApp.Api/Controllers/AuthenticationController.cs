using FitnessApp.Contracts.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FitnessApp.Application.Services.Authentication.Queries;
using FitnessApp.Application.Services.Authentication.Commands;

namespace FitnessApp.Api.Controllers
{
    [Route("auth")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationQueryService _authenticationQueryService;
        private readonly IAuthenticationCommandService _authenticationCommandService;

        public AuthenticationController(
            IAuthenticationQueryService authenticationQueryService,
            IAuthenticationCommandService authenticationCommandService
            )
        {
            _authenticationQueryService = authenticationQueryService;
            _authenticationCommandService = authenticationCommandService;
        }

        
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest registerRequest)
        {

            var authResult = _authenticationCommandService.Register(
                registerRequest.FirstName,
                registerRequest.LastName,
                registerRequest.Email,
                registerRequest.Password);

            var response = new AuthenticationResponse(
                authResult.id,
                authResult.Email,
                authResult.Token);

            return Ok(response);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest loginRequest)
        {
            var authResult = _authenticationQueryService.Login(
                loginRequest.Email,
                loginRequest.Password);

            var response = new AuthenticationResponse(
                authResult.id,
                authResult.Email,
                authResult.Token);

            return Ok(response);
        }
    }
}
