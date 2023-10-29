import React from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import { Link } from 'react-router-dom'
import './sideBar.css';

import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LoginIcon from '@mui/icons-material/Login';
import ChatIcon from '@mui/icons-material/Chat';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

import { getCurrentUser, hasPassedObligatoryForm} from '../../helpers/authHelper';

function SideBar(props) {
    const { collapseSidebar } = useProSidebar();
    const isAuthenticatedParam = getCurrentUser();
    const hasPassedObligatoryFormParam = hasPassedObligatoryForm();
    return (
        <Sidebar className="MainSidebar">
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon className="MenuIcon" />}
            onClick={() => {
              collapseSidebar();
            }}
          >
            <h3>Fitness-Diet App</h3>
          </MenuItem>
          {isAuthenticatedParam && hasPassedObligatoryFormParam === 'false'  ? (
              <>
                  <MenuItem 
                  icon={<EmojiFlagsIcon className="MenuIcon"/>}
                  component={<Link className="LinkSideBar" to="/get_started"/>}>Get started
                  </MenuItem>
              </>
          ) : null}
          {isAuthenticatedParam ? (
              <>
                  <MenuItem 
                    icon={<RestaurantIcon className="MenuIcon"/>}
                    component={<Link className="LinkSideBar" to="/diet"/>}>Diet
                  </MenuItem>
                  <MenuItem 
                    icon={<ChatIcon className="MenuIcon"/>}
                    component={<Link className="LinkSideBar" to="/chat"/>}>Chat
                  </MenuItem>
                  <SubMenu icon={<MiscellaneousServicesIcon className="MenuIcon"/>} className="LinkSideBar" label="Service">
                      <MenuItem
                        className="SubMenu" 
                        icon={<PersonIcon className="MenuIcon"/>} 
                        component={<Link className="LinkSideBar" to="/my_profile"/>}>My profile
                      </MenuItem>
                      <MenuItem 
                        className="SubMenu" 
                        icon={<MeetingRoomIcon className="MenuIcon"/>} 
                        onClick={props.handleLogout}> Logout
                      </MenuItem>
                  </SubMenu>
              </>
          ) : null}
          
          {isAuthenticatedParam ? null : (
              <>
                      <MenuItem
                        icon={<LoginIcon className="MenuIcon"/>} 
                        component={<Link className="LinkSideBar" to="/login"/>}>Login
                      </MenuItem>
                      <MenuItem
                        icon={<AppRegistrationIcon className="MenuIcon"/>} 
                        component={<Link className="LinkSideBar" to="/register"/>}>Register
                      </MenuItem>
              </>
          )}
        </Menu>
      </Sidebar>
    );
}

export default SideBar;