import React from 'react'
import {Outlet} from 'react-router-dom';
import Navigation from '../../components/navigation.jsx';

const AppLayout = () => {
  return (
    <>
    <Navigation />
    <Outlet />
    </>
  )
}

export default AppLayout