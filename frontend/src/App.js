import './App.css';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { useState } from "react";


import SideBar from './components/sideBar/sideBar';
import FormObligatory  from './components/formObligatory/formObligatory';
import SignUp  from './components/pages/signUpClient';
import Login  from './components/pages/logIn';
import ProtectedRoute from "./components/protectedRoute";


function App() {

  const [user, setUser] = useState()

  const handleLogin = (user) => {
      sessionStorage.setItem('user', user.token);
      setUser(user.token);
  }

  const handleLogout = () => {
      sessionStorage.removeItem('user')
      setUser(undefined)
  }

  return (
    <div className="App" id="App">
      <SideBar handleLogout={handleLogout} />
      <main className="MainPart">
        <Routes>
            <Route path="get_started" element={<ProtectedRoute><FormObligatory /></ProtectedRoute>} />
            <Route path="register" element={<SignUp/>} />
            <Route path="login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
