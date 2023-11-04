using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Services.Authentication.Common;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.Commands.Register;
public record RegisterCommand
(
    string FirstName,
    string LastName,
    string Email,
    string Password
): IRequest<UniqueResponse<AuthenticationResult>>;
