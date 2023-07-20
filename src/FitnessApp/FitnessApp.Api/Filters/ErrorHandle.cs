using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FitnessApp.Api.Filters;
public class ErrorHandle : ExceptionFilterAttribute
{

    public override void OnException(ExceptionContext context)
    {
        var exception = context.Exception;

        var problemDetails = new ProblemDetails
        {
            Instance = context.HttpContext.Request.Path,
            Title = exception.Message,
            Status = (int)HttpStatusCode.InternalServerError,
            Detail = exception.HelpLink
        };

        context.Result = new ObjectResult(problemDetails);
        context.ExceptionHandled = true;
    }


}
