using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.UserProfile;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetUserInformation;
public record GetUserInformationQuery
(
    Guid Id
) : IRequest<GetUserProfileResult>;