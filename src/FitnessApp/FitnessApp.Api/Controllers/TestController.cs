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

        [HttpGet("testauth")]
        public IActionResult TestaAuth()
        {
            return Ok("worked");
        }


    }
}
