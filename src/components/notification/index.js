import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment/moment.js';

import './index.css';
import {
	getNotification,
	readNotif,
	allReadNotif,
	countUnreadNotif,
} from '../../features/notification/notificationSlice';

export default function Notification() {
	const navigate = useNavigate();
	const token = useSelector((state) => state.user.auth.token);
	const { response, loading } = useSelector((state) => state.notification.notif);
	const dispatch = useDispatch();
	const location = useLocation();

	const readNotification = async (id, transactionId, title, productId, roles) => {
		await dispatch(readNotif({ token, id }));
		const current = 0;
		const size = 4;
		dispatch(getNotification({ token, current, size }));
		console.log(response);
		if (title != 'Produk Diterbitkan') {
			if (roles === 1) {
				navigate('/product/detail/' + productId);
			} else {
				navigate('/penawaran/info-penawaran/' + transactionId);
			}
		} else {
			navigate('/product/detail/' + productId);
		}
	};

	const allNotif = async () => {
		await dispatch(allReadNotif(token));
		const current = 0;
		const size = 4;
		dispatch(getNotification({ token, current, size }));
		dispatch(countUnreadNotif(token));
	};

	useEffect(() => {
		const current = 0;
		const size = 4;
		dispatch(getNotification({ token, current, size }));
	}, [location.pathname]);

	const currency = (number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
			currency: 'IDR',
		}).format(number);
	};

	return (
		<div className='notification p-6 bg-white rounded-2xl w-[376px] mt-4'>
			{loading &&
				Array(3)
					.fill()
					.map((i) => <Skeleton key={i} className='mb-3' active />)}
			{!loading && !!response && response.notificationResponses.length === 0 && (
				<p className='text-center mb-0'>Tidak ada Notifikasi</p>
			)}
			{!loading &&
				!!response &&
				response.notificationResponses &&
				response.notificationResponses.length > 0 &&
				response.notificationResponses.map((i) => (
					<div
						key={i.id}
						className='notification-item flex'
						onClick={() => readNotification(i.id, i.transactionId, i.title, i.productResponse.id, i.roles)}
					>
						<img
							className='w-12 h-12 object-cover rounded-xl mr-4'
							src={i.productResponse.imgUrl[0]}
							alt='product'
						/>
						<div className='notification-content max-w-[264px] w-full'>
							<div className='flex justify-between items-center mb-1'>
								<span className='text-[10px] text-neutralGray'>{i.title}</span>
								<span className='flex items-center text-[10px] text-neutral-500'>
									{moment(i.lastUpdated).format('DD MMM, kk:mm')}
									{!i.isRead && (
										<span className='h-2 w-2 rounded-full bg-red-600 inline-block ml-2'></span>
									)}
								</span>
							</div>
							<p className='mb-1 text-black text-sm'>{i.productResponse.name}</p>
							<p className='mb-1 text-black text-sm'>{currency(i.productResponse.price)}</p>
							{i.title !== 'Produk Diterbitkan' && (
								<p className='mb-1 text-black text-sm'>
									{i.roles === 1 ? 'Menawar' : 'Ditawar'} {currency(i.offerPrice)}
								</p>
							)}
							<span className='text-[10px] text-neutralGray leading-[10px]'>{i.info}</span>
						</div>
					</div>
				))}

			{!loading && !!response && response.notificationResponses.length !== 0 && (
				<>
					<Link className='block text-center' to={'/notification'}>
						Lihat Semua Notification
					</Link>
					<div className='flex justify-center m-2'>
						<button
							className=' text-purplePrimary cursor-pointer border-none bg-transparent'
							onClick={allNotif}
						>
							Tandai semua dibaca
						</button>
					</div>
				</>
			)}
		</div>
	);
}
