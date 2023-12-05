﻿using System.Security.Claims;
using FitnessApp.Application.Feedback.Commands.LeaveFeedback;
using FitnessApp.Application.Feedback.Queries.GetAllFeedbacks;
using FitnessApp.Contracts.Feedback;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace FitnessApp.Api.Controllers;

[Route("subscription")]
[ApiController]
[Authorize]
public class SubscriptionController : ControllerBase
{
    private readonly IMediator _mediator;

    public SubscriptionController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("add")]
    public async Task<IActionResult> Post(AddFeedbackRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var command = new LeaveFeedbackCommand(new Guid(userId), request.LevelRating, request.Text);
        var result = await _mediator.Send(command);

        return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
    }



}
