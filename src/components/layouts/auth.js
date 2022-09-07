import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout(props) {
	return (
		<>
			<div className='main-content no-header'>
				<Outlet {...props} />
			</div>
		</>
	);
}
