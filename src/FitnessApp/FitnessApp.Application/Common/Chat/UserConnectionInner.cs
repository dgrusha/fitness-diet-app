using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Chat;
public record UserConnectionInner
(
    string User,
    string Reciever,
    Guid UserId,
    Guid ReceiverId
);
