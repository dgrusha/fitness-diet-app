import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../apiCalls/chatGetUsers';
import { joinRoom, sendMessage } from '../../helpers/signalRHandlers';
import { getChatHistory } from '../../apiCalls/chatGetHistory';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
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

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {theme} from './chatNewWindowTheme';
import { useAppContext } from '../../AppContext';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useAppContext();
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [connection, setConnection] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
//
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
          user.email,
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
        <HelpCenterIcon sx={theme.iconHelp} onClick={handleClickOpen}/>
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
                textAlign: message.sender === user.email ? 'right' : 'left',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  backgroundColor:
                    message.sender === user.email ? '#9cd91b' : 'info.main',
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
            multiline
            maxRows={4}
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
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Chat FAQ     
        </DialogTitle>
        <DialogContent>
        <Typography>
          1. All conversations that were started later then 2 days ago will be deleted and pdf with chat history will be sent to you. <br/>
          4. If you have not received email with chat history after it was cleaned - check spam or write to as directly with this issue (contact info is in tab feedback). <br/>
          3. Here you can talk to coaches to receive advices from them in acheiving your goals.  <br/>
          4. This feature is available only for users that have subscription for coaches. <br/>
        </Typography>
        </DialogContent>
      </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default ChatPage;