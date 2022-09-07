import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/index';
import Footer from '../footer/index';

export default function DefaultLayoutBlank(props) {
	return (
		<>
			<div className='main-content'>
				<Header blank navigation />
				<Outlet {...props} />
				<Footer />
			</div>
		</>
	);
}
