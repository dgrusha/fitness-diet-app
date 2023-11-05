import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useState } from "react";


import SideBar from './components/sideBar/sideBar';
import FormObligatory  from './components/formObligatory/formObligatory';
import SignUp  from './components/pages/signUpClient';
import ChatNew from './components/chatNew/chatNewWindow';
import Login  from './components/pages/logIn';
import MainPage from './components/mainPage/mainPage';
import UserProfile from './components/userProfile/userProfile';
import Feedback from './components/feedback/feedback';

import ProtectedRoute from "./components/protectedRoute";
import UnprotectedRoute from "./components/unprotectedRoute";
import ProtectedRouteWithCondition from "./components/protectedRouteWithCondition";
import { useAppContext } from './AppContext';


function App() {
  const { user } = useAppContext();

  return (
    <div className="App" id="App">
      <SideBar />
      <main className="MainPart">
        <Routes>
            <Route path="get_started" element={<ProtectedRouteWithCondition><FormObligatory/></ProtectedRouteWithCondition>} />
            <Route path="register" element={<UnprotectedRoute><SignUp/></UnprotectedRoute>} />
            <Route path="" element={<MainPage/>} />
            <Route path="my_profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />
            <Route path="feedback" element={<ProtectedRoute><Feedback/></ProtectedRoute>} />
            <Route path="chat" element={<ProtectedRoute><ChatNew/></ProtectedRoute>} />
            <Route path="login" element={<UnprotectedRoute><Login/></UnprotectedRoute>} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
