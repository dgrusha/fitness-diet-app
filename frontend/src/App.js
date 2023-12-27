import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';

import ChatNew from './pages/chat';
import HomePage from './pages/home';
import SideBar from './components/organisms/Sidebar';
import Administration from "./pages/admin";
import Feedback from './pages/feedback';
import FormObligatory from './pages/formObligatory';
import Login from './pages/logIn';
import SignUp from './pages/signUpClient';
import PasswordReset from "./pages/passwordReset";
import UserProfile from './pages/userProfile';
import NotFound from './pages/notFound';
import SubscriptionPage from "./pages/subscription";

import ProtectedRoute from "./components/protectedRoute";
import ProtectedRouteWithCondition from "./components/protectedRouteWithCondition";
import UnprotectedRoute from "./components/unprotectedRoute";
import AdminRoute from "./components/adminRoute";
import { useAppContext } from './AppContext';
import Diet from "./pages/diet";
import FormDiet from "./pages/formDiet";
import Training from "./pages/training";

function App() {
	const {user} = useAppContext();

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
						<Route path="diet" element={<ProtectedRoute><Diet/></ProtectedRoute>} />
            <Route path="diet_change" element={<ProtectedRoute><FormDiet mode={1}/></ProtectedRoute>} />
						<Route path="training" element={<ProtectedRoute><Training/></ProtectedRoute>} />
						<Route path="subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
            <Route path="admin" element={<AdminRoute><Administration/></AdminRoute>} />
            <Route path="login" element={<UnprotectedRoute><Login/></UnprotectedRoute>} />
            <Route path="password_reset" element={<UnprotectedRoute><PasswordReset/></UnprotectedRoute>} />
						<Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
