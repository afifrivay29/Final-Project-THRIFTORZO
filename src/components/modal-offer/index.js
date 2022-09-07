import React, { useState, useEffect } from 'react';
import { Button, Modal, Avatar, Form, InputNumber, notification } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { sendOffer } from '../../features/transaction/transactionSlice';
import { useNavigate } from 'react-router-dom';

import { X } from 'react-feather';

import './index.css';

export default function ModalOffer(props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const token = useSelector((state) => state.user.auth.token);
	const user = useSelector((state) => state.user.user.data);
	const userId = user ? user.id : '';

	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.transaction.offer);

	const navigate = useNavigate();

	const onFinish = async (values) => {
		if (
			user.address == null &&
			user.phone == null &&
			user.phone == null &&
			user.cityName == null &&
			user.imgUrl == null
		) {
			notification.open({
				message: 'Lengkapi profile anda sebelum menawar!',
				className: 'global-alert-error',
				placement: 'top',
				duration: 3,
				style: {
					color: '#ffffff',
				},
			});
			navigate('/setting/profile');
		} else {
			values = { ...values, status: 1, productId: props.id };
			await dispatch(sendOffer({ token, userId, values }));
			setIsModalVisible(false);
			notification.open({
				message: 'Berhasil Mengirimkan Tawaran!',
				className: 'global-alert-success',
				placement: 'top',
				duration: 3,
				style: {
					color: '#ffffff',
				},
			});
		}
	};

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
				<p className='text-sm text-black font-medium mb-2'>Masukkan Harga Tawarmu</p>
				<p className='text-sm text-[#8A8A8A] mb-4'>
					Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.
				</p>
				<div className='product-match p-4 md:bg-[#EEEEEE] md:shadow-none shadow-custom bg-white rounded-2xl mb-6'>
					<div className='product flex'>
						<Avatar size={48} className='rounded-xl mr-4 flex-shrink-0' src={props.image} />
						<div className='product-info w-full flex flex-col justify-center'>
							<p className='text-sm text-black font-medium mb-1'>{props.name}</p>
							<p className='text-sm text-black mb-1'>{currency(props.price)}</p>
						</div>
					</div>
				</div>
				<Form layout='vertical' form={form} name='control-hooks' onFinish={onFinish}>
					<Form.Item
						className='mb-4'
						name='offerPrice'
						label='Harga Tawar'
						required={false}
						rules={[
							{
								required: true,
								message: 'Harga Tawar tidak boleh kosong!',
							},
							{
								type: 'number',
								message: 'Harga Tawar harus angka!',
							},
						]}
					>
						<InputNumber step='5000' placeholder='Rp 0,00' />
					</Form.Item>
					<Form.Item className='mb-0'>
						<Button loading={loading} type='primary' htmlType='submit' className='btn-custom w-full'>
							Kirim
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
