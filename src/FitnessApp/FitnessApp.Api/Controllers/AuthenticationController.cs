﻿using FitnessApp.Contracts.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using FitnessApp.Application.Commands.Register;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Application.Queries;

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
            Console.WriteLine("success1");
            var command = new RegisterCommand(
                registerRequest.FirstName,
                registerRequest.LastName,
                registerRequest.Email,
                registerRequest.Password);

            AuthenticationResult authResult = await _mediator.Send(command);

            var response = new AuthenticationResponse(
                authResult.id,
                authResult.Email,
                authResult.Token);
            Console.WriteLine("success2");
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            Console.WriteLine("success1");
            var query = new LoginQuery(
                loginRequest.Email,
                loginRequest.Password);

            AuthenticationResult authResult = await _mediator.Send(query);

            var response = new AuthenticationResponse(
                authResult.id,
                authResult.Email,
                authResult.Token);
            Console.WriteLine("success");
            return Ok(response);
        }
    }
}
