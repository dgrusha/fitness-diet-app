import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getCurrentUser } from "./authHelper";
const url = "https://localhost:7194/chat"

export const joinRoom = async (user, room, setMessages, messages, setConnection) => {
    try {
        const token = getCurrentUser();
        const connection = new HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => token,
        })
        .configureLogging(LogLevel.Information)
        .build();

        connection.on("ReceiveMessage", 
        (user, message)=>
            {
                console.log("Message received: ", message)
                setMessages(messages=>[...messages, {user, message}]);
            }
        );

        await connection.start();
        await connection.invoke("JoinRoom", {user, room});
        setConnection(connection);
    } catch (error) {
        console.log(error);
    }
}

export const sendMessage = async(message, connection) => {
    try {
        await connection.invoke("SendMessage", message);
    } catch (error) {
        console.log(error);
    }
}