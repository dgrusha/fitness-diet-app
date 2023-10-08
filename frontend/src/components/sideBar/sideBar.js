import React from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from 'react-router-dom'
import './sideBar.css';

import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function SideBar() {
    const { collapseSidebar } = useProSidebar();
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
          <MenuItem icon={<EmojiFlagsIcon className="MenuIcon"/>}><Link className="LinkSideBar" to="/get_started">Get started</Link></MenuItem>
          <MenuItem icon={<RestaurantIcon className="MenuIcon"/>}><Link className="LinkSideBar" to="/diet">Diet</Link></MenuItem>
          <MenuItem icon={<LoginIcon className="MenuIcon"/>}><Link className="LinkSideBar" to="/login">Login</Link></MenuItem>
          <MenuItem icon={<AppRegistrationIcon className="MenuIcon"/>}><Link className="LinkSideBar" to="/register">Register</Link></MenuItem>
        </Menu>
      </Sidebar>
    );
}

export default SideBar;