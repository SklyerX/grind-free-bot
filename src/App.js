import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Routes/Login/Login";
import Dashboard from './Routes/Dashboard/Dashboard';
import Sidebar from './components/SideBar/Sidebar';
import Settings from './Routes/Settings/Settings';
import Support from './Routes/Support/Support';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <Dashboard />
            <Sidebar />
          </>
        } />
        <Route path="/settings" element={
          <>
            <Navbar />
            <Settings />
            <Sidebar />
          </>
        } />
        <Route path="/support" element={
          <>
            <Navbar />
            <Support />
            <Sidebar />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
