import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
	typography: {
		fontFamily: [
			'Plus Jakarta Sans', 'Helvetica'
		].join(','),
		subtitle1: {
			fontWeight: 400,
			color: "#7D8386",
			fontSize: 16
		},
		title1: {
			fontWeight: 700,
			color: "#9CD91B",
			fontSize: '30px',
			display: 'block'
		},
		title2: {
			fontWeight: 600,
			color: "#9CD91B",
			fontSize: '23px',
			display: 'block'
		},
		title3: {
			fontWeight: 600,
			color: "#fff",
			fontSize: '23px',
			display: 'block'
		},
		server_error: {
			fontWeight: 300,
			color: "red",
			fontSize: 14
		},
		img_caption: {
			fontWeight: 600,
			color: "white",
			fontSize: "28px"
		},
		price: {
			fontWeight: 500,
			fontSize: "20px",
			display: 'block'
		}, 
		dialog: {
      paddingTop: "10px"
		},
		modal: {
			fontWeight: 700,
			color: "#fff",
			fontSize: '30px',
		},
		exercise: {
			fontWeight: 600,
			color: "#000",
			fontSize: "24px"
		}, 
		muscule: {
			display: "block",
			fontWeight: 500,
			color: "#000",
			fontSize: "18px",
			marginBottom: "8px"
		}, 
		comment: {
			padding: "10px 20px", 
			backgroundColor: "#9CD91B", 
			color: "#fff",
			fontSize: "16px",
			borderRadius: "10px 10px 10px 0px"
		},
		diet_labels: {
			fontWeight: 500,
			color: "#000",
			fontSize: "20px"
		},
		diet_description: {
			fontWeight: 400,
			color: "#000",
			fontSize: "20px"
		},
	},
	palette: {
		primary: {
			main: '#1976D2',
		},
		info: {
			main: '#2196F3',
		},
	},
	chatContainer: {
		padding: '0px 30px',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
	},
	header: {
		padding: 2,
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		backgroundColor: 'white',
		display: 'flex',
		alignItems: 'center',
	},
	messagesContainer: {
		flex: 1,
		overflowY: 'auto',
		padding: '2vh 4vh',
		display: 'flex',
		flexDirection: 'column',
		borderColor: "#7D8386"
	},
	messageBox: {
		marginBottom: 8,
		width: '50%',
		borderRadius: 8,
		padding: 1,
	},
	iconHelp: {
		marginLeft: 2,
		color: '#9cd91b',
	},
	inputSection: {
		display: 'flex',
		alignItems: 'center',
		padding: 2,
	},
	textField: {
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: '#9cd91b',
			},
		},
		'& label.Mui-focused': {
			color: '#9cd91b',
		},
		'& label': {
			color: '#000000',
		},
	},
	autocomplete: {
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: '#9cd91b',
			},
		},
		'& label.Mui-focused': {
			color: '#9cd91b',
		},
		'& label': {
			color: '#000000',
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					" .MuiInputLabel-root": {
						color: "#7D8386"
					},
					" .MuiInputLabel-root.Mui-focused": {
						color: "#7D8386"
					},
					"& .MuiOutlinedInput-root": {
						"& fieldset": { borderColor: "#9CD91B", borderWidth: 1 },
						"&:hover fieldset": { borderColor: "#6D9712" },
						"&.Mui-focused fieldset": { borderColor: "#6D9712" },
					},
					"& .MuiInput-underline.Mui-focused": { color: "#6D9712" },
					"& MuiOutlinedInput-input": {
						"& fieldset": { borderColor: "#9CD91B", borderWidth: 1 },
						"&:hover fieldset": { borderColor: "#9CD91B" },
						"&.Mui-focused fieldset": { borderColor: "#9CD91B" },
						"& .Mui-disabled": { borderColor: "#9CD91B" },
					}
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: "#9CD91B",
					},
					"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6D9712" },
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#6D9712" },
					"& .MuiSvgIcon-root": {
						color: "#9CD91B",
						"&.MuiSelect-iconOpen ": { color: "#6D9712" },
					},
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					"& .MuiInputBase-root": { color: "#7D8386" },
					"& .MuiInput-root": {
						"& fieldset": { borderColor: "#9CD91B", borderWidth: 1 },
						"&:hover fieldset": { borderColor: "#6D9712" },
						"&.Mui-focused fieldset": { borderColor: "#6D9712" },
					},
					"& .MuiInput-underline.Mui-focused": { color: "#6D9712" },
					"& .MuiIconButton-root": { color: "#9CD91B" },
					"& .MuiAutocomplete-tag": { backgroundColor: "#E1F3BA" },
					"& .MuiChip-deleteIcon": { color: "#6D9712" },
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: "#FFFFFF",
					backgroundColor: "#9CD91B",
					"&:hover": {
						backgroundColor: "#6D9712"
					},
					"&.Mui-disabled": {
						backgroundColor: "#E1F3BA"
					},
					"MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon": {
						color: "#FFFFFF"
					}
				},
				change: {
					color: "#9CD91B",
					backgroundColor: "#FFFFFF",
					borderColor: "#9CD91B",
					border: '2px solid'
				},
				edit: {
					color: "#FFFFFF",
					backgroundColor: "#9CD91B",
					borderColor: "#FFFFFF",
					border: '2px solid',
					padding: "1vh 8vh"
				},
				cancel: {
					color: "#122023",
					backgroundColor: "#F8F8FA",
					border: '2px solid',
					borderColor: "#EEEEF1"
				},
				increment: {
					minWidth: '0px',
					width: '30px',
					height: '30px'
				}
			}
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: "#9CD91B",
					"&.Mui-checked": {
						color: "#9CD91B"
					}
				}
			}
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					"&.Mui-checked": {
						color: "#9CD91B"
					}
				}
			}
		},
		select: {
			'&:before': {
				borderColor: "#9CD91B",
			},
			'&:after': {
				borderColor: "#9CD91B",
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: "#6D9712",
					textDecorationColor: "#6D9712",
					fontSize: "14px"
				},
			}
		},
		MuiAvatar: {
			styleOverrides: {
				profile: {
					marginTop: '5%',
					height: '150px',
					width: '150px',
					position: 'relative',
					cursor: 'pointer',
					"&:hover": {
						"&::before": {
							content: '"Upload"',
							color: 'white',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 1,
						},
						"& p": {
							color: '#FFFFFF',
						},
					},
				},
				coach: {
					marginTop: '5%',
					height: '150px',
					width: '150px',
					position: 'relative',
				},
				img: {
					objectFit: 'cover',
					width: '100%',
					height: '100%',
				},
			},
		},
		MuiPickersCalendarHeader: {
			styleOverrides: {
				root: {
					display: 'flex',
					justifyContent: 'space-around',
					color: '#FFF',
					backgroundColor: "#9CD91B",
					padding: '10px 0px',
					borderRadius: '10px',
					marginRight: '10px',
					marginLeft: '10px',
					svg: {
						color: '#FFF'
					},
				},
				labelContainer: {
					marginRight: '0px'
				}
			}
		},
		MuiPickersDay: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#9CD91B",
						"&:focus": {
							backgroundColor: "#9CD91B"
						},
						"&:hover": {
							backgroundColor: "#6D9712",
						}
					},
					"&:hover": {
						backgroundColor: "#E1F3BA",
					},
				}
			}
		},
		MuiDayCalendar: {
			styleOverrides: {
				header: {
					color: "#9CD91B"
				},
				weekDayLabel: {
					color: "#9CD91B"
				}
			}
		},
		MuiPickersYear: {
			styleOverrides: {
				yearButton: {
					"&.Mui-selected": {
						backgroundColor: "#9CD91B",
						"&:focus": {
							backgroundColor: "#9CD91B"
						},
					},
					"&:hover": {
						backgroundColor: "#E1F3BA",
					}
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					borderColor: "#9CD91B",
					"&:hover": {
						color: "#9CD91B",
						borderColor: "#9CD91B",
					},
					"&.Mui-selected": {
						color: "#9CD91B",
						borderColor: "#9CD91B",
					},
				},

			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					"&.Mui-focused": {
						color: "#7D8386",
					},
				}
			}
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					color: "#9CD91B"
				}
			}
		},
		MuiAlert: {
			styleOverrides: {
				info: {
					color: "#7D8386",
					backgroundColor: "#EEEEF1",
					"& .MuiAlert-icon": {
						color: "#7D8386",
					}
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: "8px"
				}
			}
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					m: 0, 
					p: 2, 
					textAlign: "center", 
					backgroundColor: "#9CD91B",
					color: "#fff"
				}
			}
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected" : {
						backgroundColor: "#9CD91B",
						color: "#fff",
						"&:hover" : {
							backgroundColor: "#6D9712",
							color: "#fff"
						}
					},
					"&:hover" : {
						backgroundColor: "#6D9712",
						color: "#fff"
					}
				}
			}
		}
	}
});
