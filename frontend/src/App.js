import './App.css';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { useState } from "react";


import SideBar from './components/sideBar/sideBar';
import FormObligatory  from './components/formObligatory/formObligatory';
import SignUp  from './components/pages/signUpClient';
import Login  from './components/pages/logIn';
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
      setUser(user.token);
  }

  const handleLogout = () => {
      sessionStorage.removeItem('user');
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
            <Route path="login" element={<UnprotectedRoute><Login hasFormHandle={hasFormHandle} handleLogin={handleLogin} /></UnprotectedRoute>} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
