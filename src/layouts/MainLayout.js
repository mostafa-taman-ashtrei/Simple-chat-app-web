import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />

        </>
    );
}

export default MainLayout;
