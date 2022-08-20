import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import './App.css';

import Navbar from "./components/navbar";
import Home from "./routes/Home/Home.jsx";
import Signup from "./routes/Signup/Signup";
import Login from "./routes/Login/Login.jsx";
import Dashboard from "./routes/Dashboard/Dashboard";
import Logout from "./routes/logout";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<>
            <Navbar />
            <Home />
          </>} />
          <Route path="/register" element={
            <>
              <Navbar />
              <Signup />
            </>
          } />
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
            </>
          } />
          <Route path="/logout" element={<Logout />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
