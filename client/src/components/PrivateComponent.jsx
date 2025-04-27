import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateComponent = ({children}) => {
    const isAuthenticated = useSelector((state) => state.user ? true : false);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
  return (
    <>{children}</>
  )
}

export default PrivateComponent