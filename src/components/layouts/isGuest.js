import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function IsGuest(props) {
	const location = useLocation();
	const token = useSelector((state) => state.user.auth.token);

	if (token) {
		return <Navigate to='/' state={{ from: location }} />;
	}

	return <Outlet {...props} />;
}
