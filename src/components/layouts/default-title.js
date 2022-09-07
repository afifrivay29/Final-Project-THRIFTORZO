import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/index';
import Footer from '../footer/index';

import { Helmet } from 'react-helmet';

export default function DefaultLayoutWithTitle(props) {
	const [title, setTitle] = useState('');

	return (
		<>
			<div className='main-content'>
				<Helmet onChangeClientState={(newState) => setTitle(newState.title)} />
				<Header title={title} />
				<Outlet {...props} />
				<Footer />
			</div>
		</>
	);
}
