using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Authentication.Commands.ChangePassword;
public record ChangePasswordCommand
(
    string Email,
    string Code, 
    string Password1, 
    string Password2
) : IRequest<HttpResponseMessage>;

