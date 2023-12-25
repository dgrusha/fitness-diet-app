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
			fontSize: 36
		},
		server_error: {
			fontWeight: 300,
			color: "red",
			fontSize: 14
		},
		img_caption: {
			fontWeight: 500,
			color: "white",
			fontSize: 24
		}
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
						backgroundColor: "#6D9712",
					},
					"&.Mui-disabled": {
						backgroundColor: "#E1F3BA",
					},
					"MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon": {
						color: '#FFF',
					},
				}
			}
		},
		MuiRadio:{
			styleOverrides: {
				root: {
					"&.Mui-checked": {
						color: "#9CD91B"
					}
				}
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: "#6D9712",
					textDecorationColor: "#6D9712"
				}
			}
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
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
	}
});
