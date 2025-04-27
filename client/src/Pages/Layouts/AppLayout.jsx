import React from 'react'
import {Outlet} from 'react-router-dom';
import Navigation from '../../components/navigation.jsx';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice.js';
import { toast } from 'react-toastify';

const AppLayout = () => {
   const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    if (window.localStorage.getItem("token") || false) {
      window.localStorage.removeItem("token");
    }
    if (window.localStorage.getItem("auth") || false) {
      window.localStorage.removeItem("auth");
    }
    toast.success("Logout Successfully");
  };

  return (
    <>
    <Navigation  handleLogout={handleLogout} />
    <Outlet />
    </>
  )
}

export default AppLayout