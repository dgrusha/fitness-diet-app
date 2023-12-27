import { createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { getUserConnection } from './apiCalls/refreshUserConnection';

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
					console.log(result.data)
          setUser(result.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

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
