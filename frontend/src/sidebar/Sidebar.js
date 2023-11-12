import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LoginIcon from '@mui/icons-material/Login';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReviewsIcon from '@mui/icons-material/Reviews';
import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sideBar.css';
import { getCurrentUser, hasPassedObligatoryForm } from '../helpers/authHelper';
import AppLogo from '../img/logo_app.svg';
import AppLogoShort from '../img/logo_app_short.svg';
import { useAppContext } from '../AppContext';

// TODO: Administration add verification to administrator
function SideBarApp() {
	const isAuthenticatedParam = getCurrentUser();
	const hasPassedObligatoryFormParam = hasPassedObligatoryForm();
	const { handleLogout } = useAppContext();
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	const toggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};
	return (
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
								icon={<AdminPanelSettingsIcon className="MenuIcon" />}
								component={<Link className="LinkSideBar" to="/admin" />}>
								Administration
							</MenuItem>
							<MenuItem
								className="SubMenu"
								icon={<ReviewsIcon className="MenuIcon" />}
								component={<Link className="LinkSideBar" to="/feedback" />}>Feedback
							</MenuItem>
							<MenuItem
								className="SubMenu"
								icon={<MeetingRoomIcon className="MenuIcon" />}
								onClick={handleLogout}> Logout
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
	);
}

export default SideBarApp;
