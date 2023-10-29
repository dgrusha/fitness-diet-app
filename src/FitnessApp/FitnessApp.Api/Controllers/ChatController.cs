using System.Security.Claims;
using FitnessApp.Application.Chat.Queries.GetChatHistory;
using FitnessApp.Contracts.Chat;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("chat")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ChatController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("getChatHistory")]
        public async Task<IActionResult> Get([FromQuery] GetChatHistoryRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new GetChatHistoryQuery(new Guid(userId), request.receiverEmail);
            var result = await _mediator.Send(query);
            return Ok(result);
        }


    }
}
