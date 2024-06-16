import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/reducers/authSlice';

const PrivateRoute: React.FC = () => {
    const authInfo = useSelector(selectAuth);

    return authInfo.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
