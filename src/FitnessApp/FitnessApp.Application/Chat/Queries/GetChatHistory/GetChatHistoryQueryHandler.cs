using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Helpers;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace FitnessApp.Application.Chat.Queries.GetChatHistory;
public class GetChatHistoryQueryHandler : IRequestHandler<GetChatHistoryQuery, string>
{

    private readonly IUserRepository _userRepository;
    private readonly IMessageRepository _messageRepository;
    private readonly IHashing _hashing;

    public GetChatHistoryQueryHandler(IUserRepository userRepository, IMessageRepository messageRepository, IHashing hashing)
    {
        _userRepository = userRepository;
        _messageRepository = messageRepository;
        _hashing = hashing;
    }


    public Task<string> Handle(GetChatHistoryQuery request, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserById(request.userId) is not User user)
        {
            return Task.FromResult("{}");
        };

        if (_userRepository.GetUserByEmail(request.receiverMail) is not User receiver)
        {
            return Task.FromResult("{}");
        };

        string conversationId = _hashing.GetUniqueName(user.Email, receiver.Email);
        List<MessageDto> messages = _messageRepository.GetMessagesFromConversation(conversationId);
        var sortedMessages = messages.OrderBy(m => m.TimeSent).ToList();

        var jsonResult = JsonConvert.SerializeObject(sortedMessages, Formatting.Indented);
        return Task.FromResult(jsonResult);
    }
}
