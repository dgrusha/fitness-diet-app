using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Services.Authentication.Common;
using MediatR;

namespace FitnessApp.Application.Authentication.Commands.RegisterCoach;
public record RegisterCoachCommand
(
    string FirstName,
    string LastName,
    string Email,
    string Password, 
    string Text,
    string FileUrl
) : IRequest<AuthenticationResult>;
