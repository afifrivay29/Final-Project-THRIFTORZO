import React, { useEffect } from 'react';
import './index.css';
import { Col, Row, Form, Input, Button, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../features/user/userSlice';

import { GoogleOutlined } from '@ant-design/icons';
import { ArrowLeft } from 'react-feather';
import { Helmet } from 'react-helmet';

export default function Login() {
	const { success, error, errorMessage, loading } = useSelector((state) => state.user.auth);

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		dispatch(auth(values));
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		if (success === true) {
			form.resetFields();
			navigate('/');
		}
	}, [success]);

	return (
		<>
			<Helmet>
				<title>Login</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<Link className='py-[14px] px-4 block md:hidden' to='/'>
				<ArrowLeft size={24} className='text-black' />
			</Link>
			<Row>
				<Col span={12} className='bg-auth hidden lg:block'></Col>
				<Col xs={{ span: 24 }} lg={{ span: 12 }} className='lg:py-0 pt-6 flex justify-center items-center'>
					<div className='max-w-[452px] w-full mx-4'>
						<h1 className='text-2xl text-black mb-6 font-bold'>Masuk</h1>
						{!!error && (
							<Alert
								className='mb-6'
								message='Error'
								description='Email/Password anda Salah!'
								type='error'
								showIcon
							/>
						)}
						<Form
							form={form}
							name='basic'
							layout='vertical'
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'
							className='h-[85vh] lg:h-auto'
						>
							<Form.Item
								className='mb-4'
								label='Email'
								name='email'
								required={false}
								rules={[
									{
										required: true,
										message: 'Email tidak boleh kosong!',
									},
									{
										type: 'email',
										message: 'Email tidak valid!',
									},
								]}
							>
								<Input placeholder='Contoh: johndee@gmail.com' />
							</Form.Item>
							<Form.Item
								className='mb-6'
								label='Password'
								name='password'
								required={false}
								rules={[
									{
										required: true,
										message: 'Password tidak boleh kosong!',
									},
								]}
							>
								<Input.Password placeholder='Masukkan password' />
							</Form.Item>
							<Form.Item className='mb-3'>
								<Button
									loading={loading}
									type='primary'
									htmlType='submit'
									className='w-full btn-custom'
								>
									Masuk
								</Button>
							</Form.Item>
							<p className='text-sm text-black text-center lg:relative absolute left-0 right-0 bottom-6 lg:bottom-0'>
								Belum punya akun?{' '}
								<Link className='font-bold' to='/register'>
									Daftar di sini
								</Link>
							</p>
						</Form>
					</div>
				</Col>
			</Row>
		</>
	);
}
