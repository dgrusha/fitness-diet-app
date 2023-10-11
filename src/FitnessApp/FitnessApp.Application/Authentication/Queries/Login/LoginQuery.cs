using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Services.Authentication.Common;
using MediatR;

namespace FitnessApp.Application.Queries;
public record LoginQuery
(
    string Email,
    string Password
): IRequest<AuthenticationResult>;
