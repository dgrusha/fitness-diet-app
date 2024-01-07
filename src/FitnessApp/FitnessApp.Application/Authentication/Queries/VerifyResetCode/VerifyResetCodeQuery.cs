using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Authentication.Queries.VerifyResetCode;
public record VerifyResetCodeQuery
(
    string Email,
    string Code
) : IRequest<HttpResponseMessage>;
