import React, { useState, useEffect  } from 'react';

import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';

import { handleTextInputChange } from '../../helpers/inputChanges';
import { joinRoom, sendMessage } from '../../helpers/signalRHandlers'

function ChatWindow()
{
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [connection, setConnection] = useState();
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const setters = {
        "user": setUser,
        "room": setRoom,
        "message": setMessage
    }

    const handleChange = event => {
        const {name, value} = event.target;
        handleTextInputChange(event, setters[name]);
    }

    const handleJoinButtonClick = async () => {
        try {
            joinRoom(user, room, setMessages, messages, setConnection);
        } catch (error) {
          console.error(error.message);
        }
    };
    
    const handleSendButtonClick = async () => {
        try {
            sendMessage(message, connection);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
        <TextField
            label="Name"
            required
            id="name-field"
            className= "text-field custom-focused-textfield"
            name = "user"
            variant="standard"
            value={user}
            onChange={handleChange}
        />
        <TextField
            label="Room"
            required
            id="room-field"
            className= "text-field custom-focused-textfield"
            name = "room"
            variant="standard"
            value={room}
            onChange={handleChange}
        />
        <Button  className="button-join" id="button-join" variant="outlined" onClick={handleJoinButtonClick}>Join</Button>
        <p>----------------------------------------</p>
        <TextField
            label="Message"
            required
            id="message-field"
            className= "text-field custom-focused-textfield"
            name = "message"
            variant="standard"
            value={message}
            onChange={handleChange}
        />
        <Button className="button-send" id="button-send" variant="outlined" onClick={handleSendButtonClick}>Send</Button>
        <p>----------------------------------------</p>
        {messages.map((messageObject, index) => (
        <p key={index}>
            <strong>{messageObject.user}:</strong> {messageObject.message}
        </p>
        ))}
        </>
    )
}

export default ChatWindow;