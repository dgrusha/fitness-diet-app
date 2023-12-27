using System.Security.Claims;
using FitnessApp.Application.Subscriptions.Commands.AddSubscription;
using FitnessApp.Application.Subscriptions.Commands.DeleteSubscription;
using FitnessApp.Application.Subscriptions.Commands.UpdateCoachSubscription;
using FitnessApp.Contracts.Subscriptions;
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
    public async Task<IActionResult> Post(AddSubscriptionRequest request)
    {
        var clientId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var command = new AddSubscriptionCommand(new Guid(clientId), request.CoachEmail, request.Duration);
        var result = await _mediator.Send(command);

        return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
    }

    [HttpDelete("cancel")]
    public async Task<IActionResult> Delete()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var command = new DeleteSubscriptionCommand(new Guid(userId));
        var result = await _mediator.Send(command);

        return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
    }


    [HttpPut("updateCoach")]
    public async Task<IActionResult> Put(UpdateCoachSubscriptionRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var command = new UpdateCoachSubscriptionCommand(new Guid(userId), request.Email);
        var result = await _mediator.Send(command);

        return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
    }

}
