import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useState } from "react";


import SideBar from './components/sideBar/sideBar';
import FormObligatory  from './components/formObligatory/formObligatory';
import SignUp  from './components/pages/signUpClient';
import ChatNew from './components/chatNew/chatNewWindow';
import Login  from './components/pages/logIn';
import MainPage from './components/mainPage/mainPage';
import UserProfile from './components/userProfile/userProfile'

import ProtectedRoute from "./components/protectedRoute";
import UnprotectedRoute from "./components/unprotectedRoute";
import ProtectedRouteWithCondition from "./components/protectedRouteWithCondition"


function App() {

  const [user, setUser] = useState();
  const [hasForm, setHasForm] = useState();

  const hasFormHandle = (hasFormMine) => {
    sessionStorage.setItem('hasForm', hasFormMine);
    setHasForm(hasFormMine);
  }

  const handleLogin = (user) => {
      sessionStorage.setItem('user', user.token);
      sessionStorage.setItem('userEmail', user.email);
      setUser(user.token);
  }

  const handleLogout = () => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userEmail');
      sessionStorage.setItem('hasForm', false);
      setUser(undefined);
      setHasForm(false);
  }

  return (
    <div className="App" id="App">
      <SideBar handleLogout={handleLogout} />
      <main className="MainPart">
        <Routes>
            <Route path="get_started" element={<ProtectedRouteWithCondition><FormObligatory hasFormHandle={hasFormHandle} /></ProtectedRouteWithCondition>} />
            <Route path="register" element={<UnprotectedRoute><SignUp/></UnprotectedRoute>} />
            <Route path="" element={<MainPage/>} />
            <Route path="my_profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />
            <Route path="chat" element={<ProtectedRoute><ChatNew/></ProtectedRoute>} />
            <Route path="login" element={<UnprotectedRoute><Login hasFormHandle={hasFormHandle} handleLogin={handleLogin} /></UnprotectedRoute>} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
