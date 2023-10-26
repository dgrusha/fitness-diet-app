using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetAllUsers;
public record GetAllUserQuery
(
    Guid Id
) : IRequest<string>;
