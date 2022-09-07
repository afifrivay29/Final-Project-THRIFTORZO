import React from 'react';
import { Button } from 'antd';
import { Search } from 'react-feather';

import './index.css';

export default function Category(props) {
	return (
		<Button
			className={`bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category ${
				props.active ? 'active' : ''
			} mr-4`}
			type='primary'
			icon={<Search className='mr-2' />}
			size='large'
		>
			{props.category ? props.category : 'Category'}
		</Button>
	);
}
