// ChatPage.js
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../apiCalls/chatGetUsers';
import {
  Box,
  TextField,
  Button,
  Paper,
  Divider,
  Typography,
  Autocomplete,
  ThemeProvider,
  createTheme,
} from '@mui/material';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    info: {
      main: '#2196F3',
    },
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'white',
  },
  header: {
    padding: 2,
    borderBottom: '1px solid grey',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  messageBox: {
    marginBottom: 8,
    width: '50%', // Set the width to 50%
    borderRadius: 8,
    padding: 1,
  },
  inputSection: {
    display: 'flex',
    alignItems: 'center',
    padding: 2,
  },
});

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'user' },
    { text: 'Hi there!', sender: 'other' },
    { text: 'How are you?', sender: 'user' },
    { text: "I'm good, thanks!", sender: 'other' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);// Replace with actual user data
  const [allUsers, setAllUsers] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedUser) {
      setMessages([
        ...messages,
        { text: newMessage, sender: 'user', userId: selectedUser.id },
      ]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    getAllUsers().then((data) => setAllUsers(data));
}, []);  

  return (
    <ThemeProvider theme={theme}>
      <Box sx={theme.chatContainer}>
        <Box sx={theme.header}>
          <Autocomplete
            options={allUsers}
            getOptionLabel={(option) => option.FirstName + " " + option.LastName}
            value={selectedUser}
            onChange={(event, newValue) => setSelectedUser(newValue)}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Search user" variant="outlined" fullWidth />
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
                textAlign: message.sender === 'user' ? 'right' : 'left',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  backgroundColor:
                    message.sender === 'user' ? '#9cd91b' : 'info.main',
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
          />
          <Button
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
