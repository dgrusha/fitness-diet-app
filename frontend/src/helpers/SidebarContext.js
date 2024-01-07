import React, { createContext, useContext, useState } from 'react';
import { useAppContext } from '../AppContext';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const { handleLogout } = useAppContext();
  let [sidebarCollapsed, setSidebarCollapsed] = useState(true);
	let [rerenderTrigger, setRerenderTrigger] = useState(sidebarCollapsed);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

	const handleLogoutClick= () =>{
		setRerenderTrigger((prev) => !prev);
		handleLogout();
	}

	const contextValue = {
    sidebarCollapsed,
    toggleSidebar,
		handleLogoutClick,
		rerenderTrigger,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
