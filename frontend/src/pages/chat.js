import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import {
	Autocomplete, Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Paper, TextField, ThemeProvider, Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../AppContext';
import { getChatHistory } from '../apiCalls/chat/chatGetHistory';
import { getChatInterlocuter } from '../apiCalls/chat/getChatInterlocuter';
import { joinRoom, sendMessage } from '../helpers/signalRHandlers';
import { appTheme } from '../helpers/themeProviderHelper';

const ChatPage = () => {
	const [messages, setMessages] = useState([]);
	const { user } = useAppContext();
	const [newMessage, setNewMessage] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [connection, setConnection] = useState();
	const [open, setOpen] = React.useState(false);
	const messagesEndRef = useRef(null);

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
		if (newValue && user !== null && newValue.email !== undefined && newValue.email !== '') {
			try {
				cleanupConnection();
				joinRoom(
					user.email,
					newValue.email,
					setMessages,
					messages,
					setConnection
				);
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
			} catch (error) {
				console.error(error.message);
			}
		}
		setSelectedUser(newValue);
	};

	useEffect(() => {
		if (!user?.isCoach && allUsers && allUsers.length > 0 && (!selectedUser || !allUsers.find(u => u.email === selectedUser.email))) {
			handleChangeChat(null, allUsers[0]);
		}
	}, [allUsers, user, selectedUser]);


	const isOptionEqualToValue = (option, value) => {
		return option.email === value.email;
	};

	useEffect(() => {
		getChatInterlocuter().then((data) => {
			if(data && data.data){
				setAllUsers(data.data.chatInterlocuters);
			}
			
		});
	}, []);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	return (
		<ThemeProvider theme={appTheme}>
			<Grid container component="main" sx={{ height: '100%',width: '100', padding: '15px', backgroundColor: '#F8F8FA' }}>
				<Box component={Paper} sx={appTheme.chatContainer}>
					<Typography variant='title1' sx={{ mt: '10px' }}>CHAT  {user?.isCoach === true ? "WITH CLIENTS" : "WITH COACH"}</Typography>
					<Box sx={appTheme.header}>
						<Autocomplete
							options={allUsers}
							getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
							value={selectedUser}
							onChange={handleChangeChat}
							isOptionEqualToValue={isOptionEqualToValue}
							fullWidth
							renderOption={(props, option) => (
								<Box component="li"  {...props}
									sx={{
										backgroundColor: 
											selectedUser && isOptionEqualToValue(selectedUser, option)? "#E1F3BA !important" : '#ffffff',
										'&:hover': {
											backgroundColor:
												selectedUser && isOptionEqualToValue(selectedUser, option)
													? "#CADAA7 !important"
													: "#F6FBEA !important"
										},
									}
								}>
									<Avatar sx={{mr: 2}} src={option.avatarFileName}/>
									{option.firstName + " " + option.lastName}
								</Box>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label={user?.isCoach === true ? "Search client" : "Your coach"}
									variant="outlined"
									fullWidth
									sx={appTheme.autocomplete}
								/>
							)}
						/>
						<HelpIcon sx={appTheme.iconHelp} onClick={handleClickOpen} />
					</Box>
					<Paper elevation={0} sx={appTheme.messagesContainer}>
						{messages.map((message, index) => (
							<Box
								key={index}
								sx={{
									marginBottom: 1,
									textAlign: message.sender === user.email ? 'right' : 'left',
								}}
							>
								<div ref={messagesEndRef} />
								<Typography
									variant="body1"
									sx={{
										backgroundColor:
											message.sender === user.email ? '#9cd91b' : 'info.main',
										color: 'white',
										padding: 1,
										borderRadius: "8px",
										wordWrap: 'break-word',
										maxWidth: '500px',
										display: 'inline-block',
									}}
								>
									  {message.text.split('\n').map((line, index) => (
											<React.Fragment key={index}>
												{index > 0 && <br />}
												{line}
											</React.Fragment>
										))}
								</Typography>
							</Box>
						))}
					</Paper>
					<Divider />
					<Box sx={appTheme.inputSection}>
						<TextField
							label="Type your message"
							variant="outlined"
							fullWidth
							multiline
							maxRows={4}
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyDown={handleKeyDown}
							sx={appTheme.textField}
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
					<Dialog
						onClose={handleClose}
						aria-labelledby="customized-dialog-title"
						open={open}
					>
						<DialogTitle id="customized-dialog-title">
							CHAT FAQ
						</DialogTitle>
						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
								color: "#fff",
							}}
						>
							<CloseIcon />
						</IconButton>
						<DialogContent dividers>
							<Typography variant="dialog" gutterBottom>
								1. All conversations that were started later then 2 days ago will be deleted and pdf with chat history will be sent to you. <br />
								4. If you have not received email with chat history after it was cleaned - check spam or write to as directly with this issue (contact info is in tab feedback). <br />
								3. Here you can talk to the coach to receive advices from them in acheiving your goals.  <br />
								4. This feature is available only for users that have subscription for coaches. <br />
							</Typography>
						</DialogContent>
					</Dialog>
				</Box>
			</Grid>
		</ThemeProvider>
	);
};

export default ChatPage;