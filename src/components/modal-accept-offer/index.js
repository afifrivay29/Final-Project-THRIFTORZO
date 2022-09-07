import React, { useState, useEffect } from 'react';
import { Button, Modal, Avatar } from 'antd';
import { X } from 'react-feather';
import { WhatsAppOutlined } from '@ant-design/icons';

import './index.css';

export default function ModalAcceptOffer(props) {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		if (props.events) {
			props.events.click = showModal;
		}
	}, [props.events]);

	const currency = (number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
			currency: 'IDR',
		}).format(number);
	};

	return (
		<>
			<Modal
				closeIcon={<X size={24} />}
				bodyStyle={{ padding: '56px 32px 24px' }}
				width={360}
				footer={null}
				visible={isModalVisible}
				onCancel={handleCancel}
			>
				<p className='text-sm text-black font-medium mb-2'>Yeay kamu berhasil mendapat harga yang sesuai</p>
				<p className='text-sm text-neutralGray mb-4'>
					Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
				</p>
				<div className='product-match p-4 md:bg-[#EEEEEE] md:shadow-none shadow-custom bg-white rounded-2xl mb-6'>
					<p className='text-sm text-black font-medium text-center mb-4'>Product Match</p>
					<div className='buyer flex mb-4'>
						<Avatar
							size={48}
							className='rounded-xl mr-4 flex-shrink-0'
							src={props.user ? props.user.imgUrl : ''}
						/>
						<div className='buyer-info w-full flex flex-col justify-center'>
							<p className='text-sm text-black font-medium mb-1'>{props.user ? props.user.name : ''}</p>
							<span className='text-[10px] text-neutralGray block leading-[14px]'>
								{props.user ? props.user.cityName : ''}
							</span>
						</div>
					</div>
					<div className='product flex'>
						<Avatar
							size={48}
							className='rounded-xl mr-4 flex-shrink-0'
							src={props.product ? props.product.imgUrl[0] : ''}
						/>
						<div className='product-info w-full flex flex-col justify-center'>
							<p className='text-sm text-black mb-1'>{props.product ? props.product.name : ''}</p>
							<p className='text-sm text-black mb-1 line-through'>
								{props.product ? currency(props.product.price) : ''}
							</p>
							<p className='text-sm text-black mb-0'>
								Ditawar {props.offer ? currency(props.offer) : ''}
							</p>
						</div>
					</div>
				</div>
				<a
					href={`https://api.whatsapp.com/send?phone=${
						props.user ? props.user.phone.replace(/^0/, '62') : ''
					}`}
					target='_blank'
				>
					<Button type='primary' className='btn-custom w-full'>
						Hubungi via Whatsapp <WhatsAppOutlined />
					</Button>
				</a>
			</Modal>
		</>
	);
}
