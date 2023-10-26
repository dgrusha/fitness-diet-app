using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace FitnessApp.Application.Common.Chat;

[Authorize]
public class ChatHub : Hub
{

    private readonly IDictionary<string, UserConnection> _connection;

    public ChatHub(IDictionary<string, UserConnection> connection)
    {
        _connection = connection;
    }

    public async Task SendMessage(string message) 
    {
        if (_connection.TryGetValue(Context.ConnectionId, out UserConnection userConnection)) 
        {
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
        }
    }

    public async Task JoinRoom(UserConnection userConnection) 
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

        _connection[Context.ConnectionId] = userConnection;
        await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, $"{userConnection.User} was activated");
    }

}
