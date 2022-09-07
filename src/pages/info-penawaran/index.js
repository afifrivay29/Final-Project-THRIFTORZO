import './index.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment.js';
import { Helmet } from 'react-helmet';
import { Button, notification, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { WhatsAppOutlined } from '@ant-design/icons';

import SalerInformation from '../../components/saler-information';
import ModalAcceptOffer from '../../components/modal-accept-offer';
import ModalChangeStatus from '../../components/modal-change-status';

import { useSelector, useDispatch } from 'react-redux';
import { detailOffer, updateStatus } from '../../features/transaction/transactionSlice';

export default function InfoPenawaran() {
	const [rejectLoading, setRejectLoading] = useState(false);
	const [acceptLoading, setAcceptLoading] = useState(false);

	const acceptEvents = { click: () => {} };
	const statusEvents = { click: () => {} };

	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.auth.token);

	const offerDetail = useSelector((state) => state.transaction.showOffer.response);
	const offerLoading = useSelector((state) => state.transaction.showOffer.loading);
	const loading = useSelector((state) => state.transaction.status.loading);
	const { id } = useParams();

	const acceptOffer = async () => {
		setAcceptLoading(true);
		const status = 3;
		await dispatch(updateStatus({ token, id, status }));
		await dispatch(detailOffer({ token, id }));
		await setAcceptLoading(false);
		acceptEvents.click();
		notification.open({
			message: 'Berhasil Menerima Tawaran!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
			style: {
				color: '#ffffff',
			},
		});
	};

	const rejectOffer = async () => {
		setRejectLoading(true);
		const status = 2;
		await dispatch(updateStatus({ token, id, status }));
		await dispatch(detailOffer({ token, id }));
		await setRejectLoading(false);
		notification.open({
			message: 'Berhasil Menolak Tawaran!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
			style: {
				color: '#ffffff',
			},
		});
	};

	const updateOfferStatus = async (status) => {
		await dispatch(updateStatus({ token, id, status }));
		await dispatch(detailOffer({ token, id }));
		notification.open({
			message: 'Status produk berhasil diperbarui!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
			style: {
				color: '#ffffff',
			},
		});
	};

	useEffect(() => {
		dispatch(detailOffer({ token, id }));
	}, [id]);

	const currency = (number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
			currency: 'IDR',
		}).format(number);
	};

	return (
		<div className='page-info-penawaran md:py-10 py-4'>
			<Helmet>
				<title>Info Penawaran</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='container container-small'>
				<SalerInformation
					loading={offerLoading}
					user={!!offerDetail && offerDetail.buyerResponse}
					edit={false}
				/>
				<h1 className='text-sm text-black font-medium leading-5 my-6 md:block hidden'>
					Daftar Produkmu yang Ditawar
				</h1>
				{offerLoading && <Skeleton active />}
				{!offerLoading && (
					<div className='notification-item flex w-full border-0 mb-0 pb-4 cursor-text'>
						<img
							className='flex-shrink-0 w-12 h-12 object-cover rounded-xl mr-4'
							src={!!offerDetail && offerDetail.productResponse.imgUrl[0]}
							alt='product'
						/>
						<div className='notification-content w-full'>
							<div className='flex justify-between items-center mb-1'>
								<span className='text-[10px] text-[#8A8A8A]'>Penawaran produk</span>
								<span className='flex items-center text-[10px] text-neutral-500'>
									{moment(!!offerDetail && offerDetail.transactionDate).format('DD MMM, kk:mm')}
								</span>
							</div>
							<p className='mb-1 text-black text-sm'>
								{!!offerDetail && offerDetail.productResponse.name}
							</p>
							<p className='mb-1 text-black text-sm'>
								{!!offerDetail && currency(offerDetail.productResponse.price)}
							</p>
							<p className='mb-1 text-black text-sm'>
								Ditawar {!!offerDetail && currency(offerDetail.offerPrice)}
							</p>
						</div>
					</div>
				)}
				<div className='notification-action md:w-1/2 w-full ml-auto'>
					{!offerLoading && !!offerDetail && offerDetail.status === 1 && (
						<>
							<Button loading={rejectLoading} type='primary' ghost onClick={rejectOffer}>
								Tolak
							</Button>
							<Button loading={acceptLoading} type='primary' className='ml-4' onClick={acceptOffer}>
								Terima
							</Button>
						</>
					)}
					{!offerLoading && !!offerDetail && offerDetail.status === 3 && (
						<>
							<Button type='primary' ghost onClick={() => statusEvents.click()}>
								Status
							</Button>
							<a
								href={`https://api.whatsapp.com/send?phone=${
									offerDetail ? offerDetail.buyerResponse.phone.replace(/^0/, '62') : ''
								}`}
								target='_blank'
							>
								<Button type='primary' className='ml-4'>
									Hubungi di <WhatsAppOutlined />
								</Button>
							</a>
						</>
					)}
				</div>
			</div>
			<ModalAcceptOffer
				user={!!offerDetail && offerDetail.buyerResponse}
				product={!!offerDetail && offerDetail.productResponse}
				offer={!!offerDetail && offerDetail.offerPrice}
				events={acceptEvents}
			/>
			<ModalChangeStatus statusSubmited={updateOfferStatus} loading={loading} events={statusEvents} />
		</div>
	);
}
