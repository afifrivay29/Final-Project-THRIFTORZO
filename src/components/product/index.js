import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';

export default function Product(props) {
	const currency = (number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
			currency: 'IDR',
		}).format(number);
	};

	return (
		<Link to={`/product/detail/${props.link}`}>
			<div className='product-card pt-2 px-2 pb-4 rounded-[4px]'>
				<div className='product-card-image mb-2 relative'>
					<img
						className='rounded-[4px] product-image w-full h-28 object-cover'
						src={props.img}
						alt={props.title}
					/>
					{props.publish === 0 && (
						<Tag className='absolute bottom-1 left-1' color='orange'>
							Draft
						</Tag>
					)}
					{props.publish === 1 && (
						<Tag className='absolute bottom-1 left-1' color='green'>
							Live
						</Tag>
					)}
				</div>
				<h4 className='text-sm text-black mb-1'>{props.title}</h4>
				<span className='block mb-2 text-[10px] text-[#8A8A8A]'>{props.category}</span>
				<span className='block text-sm text-black'>{currency(props.price)}</span>
			</div>
		</Link>
	);
}
