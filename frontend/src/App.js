import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';

import ChatNew from './components/chatNew/chatNewWindow';
import HomePage from './pages/home';
import Sidebar from './sidebar/Sidebar';
import Feedback from './pages/feedback';
import FormObligatory from './pages/formObligatory';
import Login from './pages/logIn';
import SignUp from './pages/signUpClient';
import UserProfile from './pages/userProfile';
import ProtectedRoute from "./components/protectedRoute";
import ProtectedRouteWithCondition from "./components/protectedRouteWithCondition";
import UnprotectedRoute from "./components/unprotectedRoute";


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
			<Sidebar handleLogout={handleLogout}/>
      <main className="MainPart">
        <Routes>
            <Route path="get_started" element={<ProtectedRouteWithCondition><FormObligatory hasFormHandle={hasFormHandle} /></ProtectedRouteWithCondition>} />
            <Route path="register" element={<UnprotectedRoute><SignUp/></UnprotectedRoute>} />
            <Route path="" element={<HomePage/>} />
            <Route path="my_profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />
            <Route path="feedback" element={<ProtectedRoute><Feedback/></ProtectedRoute>} />
            <Route path="chat" element={<ProtectedRoute><ChatNew/></ProtectedRoute>} />
            <Route path="login" element={<UnprotectedRoute><Login hasFormHandle={hasFormHandle} handleLogin={handleLogin} /></UnprotectedRoute>} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
