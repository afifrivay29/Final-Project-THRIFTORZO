import './index.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Alert, notification } from 'antd';
import { Helmet } from 'react-helmet';

import { useDispatch, useSelector } from 'react-redux';
import { changePassword, afterResetPassword } from '../../features/user/userSlice';

export default function Password() {
	const { success, error, errorMessage, loading } = useSelector((state) => state.user.password);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		await dispatch(changePassword(values));
	};

	useEffect(() => {
		if (success === true) {
			dispatch(afterResetPassword());
			notification.open({
				message: 'Update Password Berhasil',
				className: 'global-alert-success',
				placement: 'top',
				duration: 3,
				style: {
					color: '#ffffff',
				},
			});
			form.resetFields();
			navigate('/setting');
		}
	}, [success]);

	return (
		<div className='container'>
			<Helmet>
				<title>Ganti Password</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='update-profile-wrapper max-w-[568px] md:pt-10 pt-6 w-full mx-auto'>
				{!!error && <Alert className='mb-6' message='Error' description={errorMessage} type='error' showIcon />}
				<Form form={form} layout='vertical' name='control-hooks' onFinish={onFinish}>
					<Form.Item
						className='mb-4'
						name='oldPassword'
						label='Password Lama*'
						required={false}
						rules={[
							{
								required: true,
								message: 'Password tidak boleh kosong!',
							},
						]}
					>
						<Input.Password placeholder='Password Lama' />
					</Form.Item>
					<Form.Item
						className='mb-4'
						name='newPassword'
						label='Password Baru*'
						required={false}
						rules={[
							{
								required: true,
								message: 'Password tidak boleh kosong!',
							},
						]}
					>
						<Input.Password placeholder='Password Baru' />
					</Form.Item>
					<Form.Item
						className='mb-4'
						name='confirmPassword'
						label='Konfirmasi Password*'
						required={false}
						rules={[
							{
								required: true,
								message: 'Password tidak boleh kosong!',
							},
						]}
					>
						<Input.Password placeholder='Konfirmasi Password' />
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
