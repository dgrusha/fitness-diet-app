using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.Chat;
public record GetChatHistoryRequest
(
    string receiverEmail
);
