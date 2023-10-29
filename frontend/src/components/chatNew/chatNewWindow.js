import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../apiCalls/chatGetUsers';
import { getCurrentUserEmail } from '../../helpers/authHelper';
import { joinRoom, sendMessage } from '../../helpers/signalRHandlers';
import { getChatHistory } from '../../apiCalls/chatGetHistory';
import {
  Box,
  TextField,
  Button,
  Paper,
  Divider,
  Typography,
  Autocomplete,
  ThemeProvider,
} from '@mui/material';
import {theme} from './chatNewWindowTheme';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [connection, setConnection] = useState();
  const currentUserEmail = getCurrentUserEmail();

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedUser) {
      sendMessage(newMessage, connection);
      setNewMessage('');
    }
  };

  const cleanupConnection = () => {
    if (connection) {
      connection.stop();
    }
  };

  const handleChangeChat = (event, newValue) => {
    setMessages([]);
    if (newValue.Mail !== undefined && newValue.Mail !== '') {
      try {
        cleanupConnection();
        getChatHistory({ receiverEmail: newValue.Mail }).then((data) => {
          setMessages(
            data.map((item) => {
              return {
                text: item.Text,
                sender: item.Email,
              };
            })
          );
        });
        joinRoom(
          currentUserEmail,
          newValue.Mail,
          setMessages,
          messages,
          setConnection
        );
      } catch (error) {
        console.error(error.message);
      }
    }
    setSelectedUser(newValue);
  };

  const isOptionEqualToValue = (option, value) => {
    return option.Mail === value.Mail;
  };

  useEffect(() => {
    return () => {
      cleanupConnection();
    };
  }, []);

  useEffect(() => {
    getAllUsers().then((data) => setAllUsers(data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={theme.chatContainer}>
        <Box sx={theme.header}>
          <Autocomplete
            options={allUsers}
            getOptionLabel={(option) => option.FirstName + ' ' + option.LastName}
            value={selectedUser}
            onChange={handleChangeChat}
            isOptionEqualToValue={isOptionEqualToValue}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search user"
                variant="outlined"
                fullWidth
                sx={theme.autocomplete}
              />
            )}
          />
        </Box>

        {/* Messages Section */}
        <Paper elevation={0} sx={theme.messagesContainer}>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: 1,
                textAlign: message.sender === currentUserEmail ? 'right' : 'left',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  backgroundColor:
                    message.sender === currentUserEmail ? '#9cd91b' : 'info.main',
                  color: 'white',
                  padding: 1,
                  borderRadius: 8,
                  display: 'inline-block',
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
        </Paper>

        <Divider />

        {/* Input Section */}
        <Box sx={theme.inputSection}>
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={theme.textField}
          />
          <Button
            disabled={!selectedUser}
            variant="contained"
            color="success"
            onClick={handleSendMessage}
            sx={{ marginLeft: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatPage;