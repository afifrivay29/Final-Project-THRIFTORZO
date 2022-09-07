import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export default function isAuth(props) {
	const location = useLocation();
	const TOKEN = localStorage.getItem('token');

	if (TOKEN === null) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return <Outlet {...props} />;
}
