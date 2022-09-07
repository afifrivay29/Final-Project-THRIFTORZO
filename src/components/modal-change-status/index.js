import React, { useState, useEffect } from 'react';
import { Button, Modal, Radio, Form } from 'antd';
import { X } from 'react-feather';

import './index.css';

export default function ModalChangeStatus(props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [value, setValue] = useState(1);
	const [form] = Form.useForm();

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onFinish = async (values) => {
		await props.statusSubmited(values.status);
		setIsModalVisible(false);
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
				<p className='text-sm text-black font-medium mb-[26px]'>Perbarui status penjualan produkmu</p>
				<Form layout='vertical' form={form} name='control-hooks' onFinish={onFinish}>
					<Form.Item
						className='mb-8'
						name='status'
						rules={[
							{
								required: true,
								message: 'Please pick an item!',
							},
						]}
					>
						<Radio.Group onChange={onChange} value={value} className='mb-0'>
							<Radio value={4}>
								<span className='text-sm text-black mb-2 block'>Berhasil terjual</span>{' '}
								<p className='mb-[26px] text-sm text-neutralGray'>
									Kamu telah sepakat menjual produk ini kepada pembeli
								</p>
							</Radio>
							<Radio value={2}>
								<span className='text-sm text-black mb-2 block'>Batalkan transaksi</span>{' '}
								<p className='mb-0 text-sm text-neutralGray'>
									Kamu telah sepakat menjual produk ini kepada pembeli
								</p>
							</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item>
						<Button loading={props.loading} htmlType='submit' type='primary' className='btn-custom w-full'>
							Kirim
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
