import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoginPage from '../pages/LoginPage';


const AuthGuard = ({ children }) => {
    const { isAuth } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isAuth) {
        if (pathname !== requestedLocation) setRequestedLocation(pathname);
        return <LoginPage />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
};

export default AuthGuard;
