import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import AdminSkeleton from "./components/skeletons/AdminSkeleton";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) checkAuth();
  }, []);

  if (isAdminRoute && isCheckingAuth) return <AdminSkeleton />;

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/admin" element={authUser ? <AdminPage /> : <Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
