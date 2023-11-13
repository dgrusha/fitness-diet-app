import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';

import ChatNew from './components/chatNew/chatNewWindow';
import HomePage from './pages/home';
import SideBar from './sidebar/Sidebar';
import Feedback from './pages/feedback';
import FormObligatory from './pages/formObligatory';
import Login from './pages/logIn';
import SignUp from './pages/signUpClient';
import UserProfile from './pages/userProfile';
import NotFound from './pages/notFound';

import ProtectedRoute from "./components/protectedRoute";
import ProtectedRouteWithCondition from "./components/protectedRouteWithCondition";
import UnprotectedRoute from "./components/unprotectedRoute";
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
            <Route path="" element={<HomePage/>} />
            <Route path="my_profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />
            <Route path="feedback" element={<ProtectedRoute><Feedback/></ProtectedRoute>} />
            <Route path="chat" element={<ProtectedRoute><ChatNew/></ProtectedRoute>} />
            <Route path="login" element={<UnprotectedRoute><Login/></UnprotectedRoute>} />
						<Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
