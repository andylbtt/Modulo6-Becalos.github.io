import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home user={user} logout={logout} />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;