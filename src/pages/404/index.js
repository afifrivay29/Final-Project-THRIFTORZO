import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './index.css';

export default function PageNotFound() {
	return (
		<>
			<Helmet>
				<title>Page Not Found</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='error-section mt-24'>
				<div className='container'>
					<h1 className='text-9xl leading-[128px] text-purplePrimary text-center font-bold mb-6'>404</h1>
					<h4 className='text-xl text-black text-center font-bold mb-6'>Page Not Found</h4>
					<p className='text-lg text-black text-center mb-6'>
						Sorry, we couldn't find the page. Back to homepage
					</p>
					<Link to={'/'}>
						<Button type='primary' className='btn-custom block mx-auto' ghost>
							Back to Home
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
}
