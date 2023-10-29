using System.Security.Claims;
using FitnessApp.Application.Common.Helpers;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace FitnessApp.Application.Common.Chat;

[Authorize]
public class ChatHub : Hub
{

    private readonly IDictionary<string, UserConnectionInner> _connection;
    private readonly IHashing _hashing;
    private readonly IConversationRepository _conversationRepository;
    private readonly IMessageRepository _messageRepository;
    private readonly IUserRepository _userRepository;

    public ChatHub(
        IDictionary<string, UserConnectionInner> connection,
        IHashing hashing,
        IConversationRepository conversationRepository,
        IMessageRepository messageRepository,
        IUserRepository userRepository
        )
    {
        _connection = connection;
        _hashing = hashing;
        _conversationRepository = conversationRepository;
        _messageRepository = messageRepository;
        _userRepository = userRepository;
    }

    public async Task SendMessage(string message) 
    {
        if (_connection.TryGetValue(Context.ConnectionId, out UserConnectionInner userConnection)) 
        {
            string roomName = _hashing.GetUniqueName(userConnection.User, userConnection.Reciever);
            await Clients.Group(roomName).SendAsync("ReceiveMessage", userConnection.User, message);
            Message messageToSave = new Message
            {
                Text = message,
                SenderId = userConnection.UserId,
                ConversationId = roomName
            };
            _messageRepository.Add(messageToSave);
        }
    }

    public async Task JoinRoom(UserConnection userConnection) 
    {
        string roomName = _hashing.GetUniqueName(userConnection.User, userConnection.Reciever);
        var conversation = _conversationRepository.GetById(roomName);
        var user = _userRepository.GetUserByEmail(userConnection.User);
        var receiver = _userRepository.GetUserByEmail(userConnection.Reciever);
        if (user == null || receiver == null)
        {
            return;
        }
        Guid userId, receiverId;
        userId = user.Id;
        receiverId = receiver.Id;
        if (conversation == null)
        {
            
            Conversation conversationToSave = new Conversation
            {
                Id = roomName,
                User1Id = user.Id,
                User2Id = receiver.Id
            };
            _conversationRepository.Add(conversationToSave);
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);

        _connection[Context.ConnectionId] = new UserConnectionInner(userConnection.User, userConnection.Reciever, userId, receiverId);
        await Clients.Group(roomName).SendAsync("ReceiveMessage", userConnection.User, $"{userConnection.User} entered the chat!");
    }

}
