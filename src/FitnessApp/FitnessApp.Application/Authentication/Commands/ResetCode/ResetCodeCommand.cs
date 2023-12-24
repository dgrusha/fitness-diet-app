using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Authentication.Commands.ResetCode;
public record ResetCodeCommand
(
    string Email
) : IRequest<HttpResponseMessage>;
