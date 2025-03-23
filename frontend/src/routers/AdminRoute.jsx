import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/admin" />;
    }

    return children;
};

export default AdminRoute;