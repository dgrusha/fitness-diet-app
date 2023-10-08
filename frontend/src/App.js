import './App.css';
import {Routes, Route } from 'react-router-dom';


import SideBar from './components/sideBar/sideBar';
import FormObligatory  from './components/formObligatory/formObligatory';
import SignUp  from './components/pages/signUpClient';
import Login  from './components/pages/logIn';

function App() {
  return (
    <div className="App" id="App">
      <SideBar />
      <main className="MainPart">
        <Routes>
            <Route path="get_started" element={<FormObligatory />} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
