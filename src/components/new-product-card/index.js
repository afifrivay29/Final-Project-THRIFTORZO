import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

import { Plus } from 'react-feather';

export default function NewProduct(props) {
	const navigate = useNavigate();
	const handleCreate = () => {
		navigate('/create/product');
	};

	return (
		<div
			onClick={handleCreate}
			className='cursor-pointer create-product border border-dashed border-[#D0D0D0] rounded-[4px] flex justify-center items-center flex-col h-[212px]'
		>
			<Plus size={24} className='mb-2' color='#8A8A8A' />
			<span className='text-xs text-[#8A8A8A]'>Tambah Produk</span>
		</div>
	);
}
