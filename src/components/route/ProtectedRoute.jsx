import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsLogin } from '../../helper/localStorageHandler';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = getIsLogin();

    if (!isAuthenticated) {
        return <Navigate to="/signinup" replace />;
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
