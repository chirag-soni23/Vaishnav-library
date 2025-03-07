import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserData } from "./context/UserContext";
import Loading from "./components/Loading";
import Setting from "./pages/Setting";
import Navbar from "./components/Navbar";
import { useThemeStore } from "./context/useThemeStore";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword";
import Member from "./components/Member";

const App = () => {
  const { isAuth, loading } = UserData();
  const { theme } = useThemeStore()

  if (loading) return <Loading />

  return (
    <BrowserRouter>
      <div data-theme={theme}>
        {isAuth && <Navbar />}
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/settings" element={isAuth ? <Setting /> : <Login />} />
          <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
          <Route path="/profile" element={isAuth ? <Profile /> : <Login />} />
          <Route path="/members" element={isAuth ? <Member /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
