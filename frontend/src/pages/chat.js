import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../apiCalls/chat/chatGetUsers';
import { getCoach } from '../apiCalls/getUserCoach';
import { getChatInterlocuter } from '../apiCalls/chat/getChatInterlocuter';
import { joinRoom, sendMessage } from '../helpers/signalRHandlers';
import { getChatHistory } from '../apiCalls/chat/chatGetHistory';
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
	Dialog,
	DialogTitle,
	DialogContent
} from '@mui/material';

import { theme } from '../components/chatNew/chatNewWindowTheme';
import { useAppContext } from '../AppContext';

const ChatPage = () => {
	const [messages, setMessages] = useState([]);
	const { user } = useAppContext();
	const [newMessage, setNewMessage] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [connection, setConnection] = useState();
	const [open, setOpen] = React.useState(false);
	const [coach, setCoach] = useState(null)

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

	const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        setNewMessage((prevMessage) => prevMessage + '\n');
      } else {
        handleSendMessage();
      }
    }
  };

	const handleChangeChat = (event, newValue) => {
		setMessages([]);
		if (newValue && user !== null && newValue.email !== undefined && newValue.email !== '') {
			try {
				cleanupConnection();
				getChatHistory({ receiverEmail: newValue.email }).then((data) => {
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
					newValue.email,
					setMessages,
					messages,
					setConnection
				);
			} catch (error) {
				console.error(error.message);
			}
		}
		console.log(newValue)
		setSelectedUser(newValue);
	};

	const isOptionEqualToValue = (option, value) => {
		return option.email === value.email;
	};

	useEffect(() => {
		return () => {
			cleanupConnection();
		};
	}, []);

	useEffect(() => {
		getChatInterlocuter().then((data) => {
			console.log(data.data.chatInterlocuters);
			setAllUsers(data.data.chatInterlocuters)});
		console.log('jdsajhfgaiudgsiaugdiua')
		console.log(selectedUser);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={theme.chatContainer}>
				<Box sx={theme.header}>
				<HelpCenterIcon sx={theme.iconHelp} onClick={handleClickOpen}/>
					<Autocomplete
						options={allUsers}
						getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
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
						onKeyDown={handleKeyDown}
						sx={theme.textField}
					/>
					<Button
						disabled={!selectedUser}
						variant="contained"
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