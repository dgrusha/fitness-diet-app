using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Chat.Queries.GetChatHistory;
public record GetChatHistoryQuery
(
    Guid userId,
    string receiverMail
):IRequest<string>;
