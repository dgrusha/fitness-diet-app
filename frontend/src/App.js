import './App.css';
import {Routes, Route } from 'react-router-dom';


import SideBar from './components/sideBar/sideBar';
import FormObligatory  from './components/formObligatory/formObligatory';


function App() {
  return (
    <div className="App" id="App">
      <SideBar />
      <main className="MainPart">
        <Routes>
            <Route path="get_started" element={<FormObligatory />} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
