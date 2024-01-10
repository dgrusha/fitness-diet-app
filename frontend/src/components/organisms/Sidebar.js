import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LoginIcon from '@mui/icons-material/Login';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { useSidebarContext } from '../../helpers/SidebarContext';
import { getCurrentUser } from '../../helpers/authHelper';
import { appTheme } from '../../helpers/themeProviderHelper';
import AppLogo from '../../img/logo_app.svg';
import AppLogoShort from '../../img/logo_app_short.svg';


function SideBarApp() {
	const { user, hasForm } = useAppContext();
	const isAuthenticatedParam = getCurrentUser();
	const { sidebarCollapsed, toggleSidebar, handleLogoutClick } = useSidebarContext();

	return (
		<ThemeProvider theme={appTheme}>
			<Sidebar style={{fontWeight: 550, backgroundColor: "#fff"}} collapsed={sidebarCollapsed}>
				<Menu>
					<MenuItem icon={sidebarCollapsed ? <img src={AppLogoShort} alt="Logo" /> : null} onClick={toggleSidebar}>
						<img src={AppLogo} alt="Logo" />
					</MenuItem>
					{isAuthenticatedParam ? (
						<>
							{!hasForm && !user?.isCoach ? (
								<MenuItem
									icon={<EmojiFlagsIcon className="MenuIcon" />}
									component={<Link to="/get_started" />}>Get started
								</MenuItem>
							) : null}
							{isAuthenticatedParam && hasForm && !user?.isCoach ? (
								<>
									<MenuItem
										icon={<RestaurantIcon className="MenuIcon" />}
										component={<Link to="/diet" />}>Diet
									</MenuItem>
									<MenuItem
										icon={<FitnessCenterIcon className="MenuIcon" />}
										component={<Link to="/training" />}>Training
									</MenuItem>
								</>
							) : null}
							{user?.hasSubscription || user?.isCoach ? (
								<MenuItem
									icon={<ChatIcon className="MenuIcon" />}
									component={<Link to="/chat" />}>
									Chat
								</MenuItem>
							) : null}
							{user?.isCoach ? (
								<MenuItem
									icon={<RateReviewIcon className="MenuIcon" />}
									component={<Link to="/coach_feedback" />}>Manage clients
								</MenuItem>
							) : null}
							<SubMenu label="Service" icon={<MiscellaneousServicesIcon className="MenuIcon" />}>
								<MenuItem
									icon={<PersonIcon className="MenuIcon" />}
									component={<Link to="/my_profile" />}>My profile
								</MenuItem>
								{user?.isAdmin ? (
									<MenuItem
										icon={<AdminPanelSettingsIcon className="MenuIcon" />}
										component={<Link to="/admin" />}>Administration
									</MenuItem>
								) : null}
								{!user?.isCoach ? (
									<MenuItem
										icon={<PaymentsIcon className="MenuIcon" />}
										component={<Link to="/subscription" />}>Subscription
									</MenuItem>
								) : null}
								<MenuItem
									icon={<ReviewsIcon className="MenuIcon" />}
									component={<Link to="/feedback" />}>Feedback
								</MenuItem>
								<MenuItem
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
								component={<Link to="/login" />}>Login
							</MenuItem>
							<MenuItem
								icon={<AppRegistrationIcon className="MenuIcon" />}
								component={<Link to="/register" />}>Register
							</MenuItem>
						</>
					) : null}
				</Menu>
			</Sidebar>
		</ThemeProvider>
	);
}

export default SideBarApp;
