import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, Alert, Upload, notification } from 'antd';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../features/user/userSlice';

export default function Profile() {
	const profileUser = useSelector((state) => state.user.user.data);
	const successGetUser = useSelector((state) => state.user.user.success);
	const { error, errorMessage, loading } = useSelector((state) => state.user.update);
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [imageLoading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const [cities, setCity] = useState([]);

	const onFinish = async (values) => {
		values = { ...values, imgUrl: imageUrl };
		await dispatch(updateUser(values));
		await dispatch(getUser());
		form.setFieldsValue(values);
		notification.open({
			message: 'Update profile Berhasil',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
			style: {
				color: '#ffffff',
			},
		});
	};

	const { Option } = Select;
	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			notification.open({
				message: 'Gambar harus berformat JPG/PNG!',
				className: 'global-alert-error',
				placement: 'top',
				duration: 3,
				style: {
					color: '#ffffff',
				},
			});
		}

		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			notification.open({
				message: 'Gambar tidak boleh lebih dari 2MB!',
				className: 'global-alert-error',
				placement: 'top',
				duration: 3,
				style: {
					color: '#ffffff',
				},
			});
		}

		return isJpgOrPng && isLt2M;
	};

	const handleChange = async (info) => {
		setLoading(true);

		let bodyFormData = new FormData();
		bodyFormData.append('imageFile', info.file.originFileObj);

		await axios
			.post('https://thriftorzo-api.herokuapp.com/user/avatar', bodyFormData, {
				headers: {
					ContentType: 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				setLoading(false);
				setImageUrl(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const getCity = async () => {
		const country = { country: 'indonesia' };
		await axios
			.post('https://countriesnow.space/api/v0.1/countries/cities', country)
			.then((res) => {
				const data = res.data.data;
				setCity(data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		getCity();
	}, []);

	useEffect(() => {
		dispatch(getUser());
		setImageUrl(profileUser ? profileUser.imgUrl : '');
		form.setFieldsValue(profileUser);
	}, [dispatch, successGetUser]);

	const uploadButton = (
		<div>
			{imageLoading ? (
				<LoadingOutlined style={{ fontSize: '30px', color: '#7126B5' }} />
			) : (
				<CameraOutlined style={{ fontSize: '24px', color: '#7126B5' }} />
			)}
		</div>
	);

	return (
		<div className='container'>
			<Helmet>
				<title>Lengkapi Info Akun</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='update-profile-wrapper max-w-[568px] md:pt-10 pt-6 w-full mx-auto'>
				<Upload
					name='avatar'
					listType='picture-card'
					className='avatar-uploader relative mb-6 w-24 h-24 mx-auto block'
					showUploadList={false}
					beforeUpload={beforeUpload}
					onChange={handleChange}
					customRequest={handleChange}
				>
					{imageUrl && !imageLoading ? (
						<img
							src={imageUrl}
							alt='avatar'
							style={{
								width: '100%',
								height: '100%',
								borderRadius: '12px',
								objectFit: 'cover',
							}}
						/>
					) : (
						uploadButton
					)}
				</Upload>
				{!!error && <Alert className='mb-6' message='Error' description={errorMessage} type='error' showIcon />}
				<Form form={form} layout='vertical' name='control-hooks' onFinish={onFinish}>
					<Form.Item
						className='mb-4'
						name='name'
						label='Nama*'
						required={false}
						rules={[
							{
								required: true,
								message: 'Nama tidak boleh kosong!',
							},
						]}
					>
						<Input placeholder='Nama' />
					</Form.Item>
					<Form.Item
						className='mb-4 select-city'
						name='cityName'
						label='Kota*'
						required={false}
						rules={[
							{
								required: true,
								message: 'Kota tidak boleh kosong!',
							},
						]}
					>
						<Select placeholder='Pilih Kota' allowClear showSearch>
							{!cities && cities.length < 0 && <Option value=''>Loading</Option>}
							{!!cities &&
								cities.length > 0 &&
								cities.map((item, index) => (
									<Option key={index} value={item}>
										{item}
									</Option>
								))}
						</Select>
					</Form.Item>
					<Form.Item
						className='mb-4'
						name='address'
						label='Alamat*'
						required={false}
						rules={[
							{
								required: true,
								message: 'Alamat tidak boleh kosong!',
							},
						]}
					>
						<Input.TextArea rows={2} placeholder='Alamat' />
					</Form.Item>
					<Form.Item
						className='mb-6'
						name='phone'
						label='No Handphone*'
						required={false}
						rules={[
							{
								required: true,
								message: 'No Handphone tidak boleh kosong!',
							},
						]}
					>
						<Input placeholder='contoh: +628123456789' />
					</Form.Item>
					<Form.Item>
						<Button loading={loading} className='w-full btn-custom' type='primary' htmlType='submit'>
							Simpan
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
