import React from 'react';
import { Button } from 'antd';
import { Plus } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import './index.css';

export default function SellButton() {
	const navigate = useNavigate();

	const createProduct = () => {
		navigate('/create/product');
	};

	return (
		<Button
			onClick={createProduct}
			className='bg-[#7126b5] text-[#ffffff] py-3 px-6 h-[52px] flex items-center rounded-xl sell-btn mx-auto shadow-buttonSell fixed bottom-[24px] left-1/2 z-10'
			type='primary'
			icon={<Plus className='mr-4' />}
			size='large'
		>
			Jual
		</Button>
	);
}
