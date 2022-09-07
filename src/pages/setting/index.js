import './index.css';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { Helmet } from 'react-helmet';
import { Edit3, Settings, LogOut } from 'react-feather';

import { useDispatch, useSelector } from 'react-redux';
import { getUser, reset } from '../../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Setting() {
	const profileUser = useSelector((state) => state.user.user.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await navigate('/');
		await localStorage.removeItem('token');
		await localStorage.removeItem('user');
		await dispatch(reset());
	};

	useEffect(() => {
		dispatch(getUser());
	}, []);

	return (
		<div className='container'>
			<Helmet>
				<title>Akun Saya</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='update-profile-wrapper max-w-[568px] md:pt-10 pt-6 w-full mx-auto'>
				<div className='profile-avatar text-center w-full mb-8'>
					<Avatar
						size={96}
						className='rounded-xl'
						src={
							profileUser.imgUrl
								? profileUser.imgUrl
								: `https://ui-avatars.com/api/?name=${profileUser.name}`
						}
					/>
				</div>
				<div className='seeting-nav'>
					<Link to={'/setting/profile'} className='flex items-center mb-4'>
						<Edit3 size={24} className='text-purplePrimary' />
						<span className='text-black ml-4 inline-block'>Ubah Akun</span>
					</Link>
					<Link to={'/setting/password'} className='flex items-center mb-4'>
						<Settings size={24} className='text-purplePrimary' />
						<span className='text-black ml-4 inline-block'>Pengaturan Akun</span>
					</Link>
					<div onClick={handleLogout} className='flex items-center mb-4 cursor-pointer'>
						<LogOut size={24} className='text-purplePrimary' />
						<span className='text-black ml-4 inline-block'>Keluar</span>
					</div>
				</div>
				<p className='text-xs text-[#8A8A8A] mt-4 text-center'>Version 1.0.0</p>
			</div>
		</div>
	);
}
