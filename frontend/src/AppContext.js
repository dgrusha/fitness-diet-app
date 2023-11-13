import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [hasForm, setHasForm] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const hasFormHandle = (hasFormMine) => {
    sessionStorage.setItem('hasForm', hasFormMine);
    setHasForm(hasFormMine);
  };

  const handleLogin = (userData) => {
    sessionStorage.setItem('user', userData.token);
    setUser(userData);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.setItem('hasForm', false);
    setUser(null);
    setHasForm(false);
    navigate("/login");
  };

  const contextValue = {
    hasForm,
    hasFormHandle,
    user,
    handleLogin,
    handleLogout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
