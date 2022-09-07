import './index.css';
import React, { useEffect } from 'react';
import moment from 'moment/moment.js';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Skeleton } from 'antd';
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
		const size = 8;
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

	const paginationHandler = (current) => {
		const size = 8;
		current = current - 1;
		dispatch(getNotification({ token, current, size }));
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		const current = 0;
		const size = 8;
		dispatch(getNotification({ token, current, size }));
		console.log(response);
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
		<>
			<Helmet>
				<title>Notifikasi</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='notifiation-page md:pt-8'>
				{!loading && (
					<div className='flex justify-center m-2 pb-5 md:pb-3'>
						<button
							className='text-purplePrimary cursor-pointer border-none bg-transparent'
							onClick={allNotif}
						>
							Tandai semua dibaca
						</button>
					</div>
				)}
				<div className='container container-internal'>
					{loading &&
						Array(10)
							.fill()
							.map((i) => <Skeleton key={i} className='mb-10' active />)}
					{!loading && !!response && response.notificationResponses.length === 0 && (
						<p className='text-center'>Tidak ada Notifikasi</p>
					)}
					{!loading &&
						!!response &&
						response.notificationResponses &&
						response.notificationResponses.length > 0 &&
						response.notificationResponses.map((i) => (
							<div
								className='notification-item flex justify-between'
								onClick={() =>
									readNotification(i.id, i.transactionId, i.title, i.productResponse.id, i.roles)
								}
							>
								<img
									className='w-12 h-12 object-cover rounded-xl flex-shrink-0'
									src={i.productResponse.imgUrl[0]}
									alt='product'
								/>
								<div className='notification-content w-full ml-4'>
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
					{!loading && !!response && response.totalPage > 1 && (
						<Pagination
							className='mb-10 mt-10'
							onChange={paginationHandler}
							defaultCurrent={1}
							current={!!response && response.currentPage + 1}
							total={!!response && response.totalElement}
							pageSize={8}
						/>
					)}
				</div>
			</div>
		</>
	);
}
