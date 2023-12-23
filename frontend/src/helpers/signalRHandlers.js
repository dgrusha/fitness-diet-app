import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getCurrentUser } from "./authHelper";
import { Constants } from "./constants";
const url = Constants.BaseUrl + "chat"

export const joinRoom = async (user, reciever, setMessages, messages, setConnection) => {
    const token = getCurrentUser();
    const connection = new HubConnectionBuilder()
    .withUrl(url, {
        accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.None)
    .build();

    connection.on("ReceiveMessage", 
    (user, message)=>
        {
            setMessages(messages=>[...messages, {text: message, sender:user }]);
        }
    );
    
    await connection.start();
    await connection.invoke("JoinRoom", {user, reciever});
    setConnection(connection);
}

export const sendMessage = async(message, connection) => {
    try {
        await connection.invoke("SendMessage", message);
    } catch (error) {
        console.log(error);
    }
}