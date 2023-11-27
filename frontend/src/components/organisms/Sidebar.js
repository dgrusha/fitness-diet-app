import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LoginIcon from '@mui/icons-material/Login';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PaymentsIcon from '@mui/icons-material/Payments';
import React from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sideBar.css';
import { getCurrentUser, hasPassedObligatoryForm } from '../../helpers/authHelper';
import AppLogo from '../../img/logo_app.svg';
import AppLogoShort from '../../img/logo_app_short.svg';
import { useSidebarContext } from '../../helpers/SidebarContext';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../../helpers/themeProviderHelper';


function SideBarApp() {
	const isAuthenticatedParam = getCurrentUser();
	const hasPassedObligatoryFormParam = hasPassedObligatoryForm();
	const { sidebarCollapsed, toggleSidebar, handleLogoutClick } = useSidebarContext();

	return (
		<ThemeProvider theme={appTheme}>
			<Sidebar className="MainSidebar" collapsed={sidebarCollapsed}>
				<Menu>
					<MenuItem icon={sidebarCollapsed ? <img src={AppLogoShort} alt="Logo" className='logo' /> : null} onClick={toggleSidebar}>
						<img src={AppLogo} alt="Logo" className='logo' />
					</MenuItem>
					{isAuthenticatedParam && hasPassedObligatoryFormParam === 'false' ? (
						<MenuItem
							icon={<EmojiFlagsIcon className="MenuIcon" />}
							component={<Link className="LinkSideBar" to="/get_started" />}>Get started
						</MenuItem>
					) : null}
					{isAuthenticatedParam ? (
						<>
							<MenuItem
								icon={<RestaurantIcon className="MenuIcon" />}
								component={<Link className="LinkSideBar" to="/diet" />}>Diet
							</MenuItem>
							<MenuItem
								icon={<FitnessCenterIcon className="MenuIcon" />}
								component={<Link className="LinkSideBar" to="/training" />}>Training
							</MenuItem>
							<MenuItem
								icon={<ChatIcon className="MenuIcon" />}
								component={<Link className="LinkSideBar" to="/chat" />}>
								Chat
							</MenuItem>
							<SubMenu className="LinkSideBar" label="Service" icon={<MiscellaneousServicesIcon className="MenuIcon" />}>
								<MenuItem
									className="SubMenu"
									icon={<PersonIcon className="MenuIcon" />}
									component={<Link className="LinkSideBar" to="/my_profile" />}>My profile
								</MenuItem>
								<MenuItem
									className="SubMenu"
									icon={<PaymentsIcon className="MenuIcon" />}
									component={<Link className="LinkSideBar" to="/subscription" />}>Subscription
								</MenuItem>
								<MenuItem
									className="SubMenu"
									icon={<ReviewsIcon className="MenuIcon" />}
									component={<Link className="LinkSideBar" to="/feedback" />}>Feedback
								</MenuItem>
								<MenuItem
									className="SubMenu"
									icon={<MeetingRoomIcon className="MenuIcon" />}
									onClick={handleLogoutClick}> Logout
								</MenuItem>
							</SubMenu>
						</>
					) : null}
					{!isAuthenticatedParam ? (
						<>
							<MenuItem
								icon={<LoginIcon className="MenuIcon" />}
								component={<Link className="LinkSideBar" to="/login" />}>Login
							</MenuItem>
							<MenuItem
								icon={<AppRegistrationIcon className="MenuIcon" />}
								component={<Link className="LinkSideBar" to="/register" />}>Register
							</MenuItem>
						</>
					) : null}
				</Menu>
			</Sidebar>
		</ThemeProvider>
	);
}

export default SideBarApp;
