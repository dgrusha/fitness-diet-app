using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.UserProfile;

public record GetChatInterlocuterResult
(
    IEnumerable<ChatInterlocuterDto> chatInterlocuters
);
