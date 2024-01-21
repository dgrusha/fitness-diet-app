import { createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { getUserConnection } from './apiCalls/authentication/refreshUserConnection';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [hasForm, setHasForm] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser && user === null) {
          const result = await getUserConnection();
          setUser(result.data);
	  setHasForm(result.data.hasObligatoryForm)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [user]);

	const refreshContext = () => {
    setUser((prevUser) => ({ ...prevUser, hasSubscription: !prevUser.hasSubscription }));
  };

	const setHasFormStatus = (hasFormStatus) => {
    localStorage.setItem('hasForm', hasFormStatus);
    setHasForm(hasFormStatus);
    setUser((prevUser) => ({ ...prevUser, hasObligatoryForm: hasFormStatus }));
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
    setHasForm : setHasFormStatus,
    user,
    handleLogin,
    handleLogout,
		refreshContext
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
