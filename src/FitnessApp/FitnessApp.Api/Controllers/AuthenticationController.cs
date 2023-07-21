using FitnessApp.Contracts.Authentication;
using FitnessApp.Application.Services.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace FitnessApp.Api.Controllers
{
    [Route("auth")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest registerRequest)
        {

            var authResult = _authenticationService.Register(
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
            var authResult = _authenticationService.Login(
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
