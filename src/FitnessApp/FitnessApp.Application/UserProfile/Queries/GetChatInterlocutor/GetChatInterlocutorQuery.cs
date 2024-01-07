using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetChatInterlocutor;

public record GetChatInterlocutorQuery
(
    Guid userId
) : IRequest<UniqueResponse<GetChatInterlocuterResult>>;
