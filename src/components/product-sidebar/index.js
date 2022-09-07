import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, notification, Skeleton } from 'antd';

import ModalOffer from '../modal-offer';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	publishProduct,
	getProductDetail,
	removeWishlist,
	addToWishlist,
} from '../../features/product/productSlice';

import './index.css';

const ProductStatus = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = useSelector((state) => state.user.auth.token);
	const { loading } = useSelector((state) => state.product.delete);
	const { response } = useSelector((state) => state.product.detail);
	const publishLoading = useSelector((state) => state.product.publish.loading);

	const deleteHandler = async (id) => {
		await dispatch(deleteProduct({ token, id }));
		notification.open({
			message: 'Berhasil Menghapus Produk!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
			style: {
				color: '#ffffff',
			},
		});
		navigate('/aktivitas');
	};

	const publishHandler = async () => {
		const values = { ...response, publish: 1 };
		await dispatch(publishProduct({ token, values }));
		await dispatch(getProductDetail(values.id));
		notification.open({
			message: 'Berhasil Menerbitkan Produk!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
			style: {
				color: '#ffffff',
			},
		});
	};

	return (
		<>
			{props.publish !== 1 && (
				<Button
					loading={publishLoading}
					onClick={publishHandler}
					className='w-full btn-custom md:mb-[14px] md:mr-0 mb-0 mr-4 border border-solid border-[#9f42f3]'
					type='primary'
					htmlType='submit'
				>
					Terbitkan
				</Button>
			)}
			{props.publish === 1 && (
				<Popconfirm
					loading={loading}
					title='Apakah anda yakin menghapus produk ini?'
					onConfirm={() => deleteHandler(props.id)}
					okText='Iya'
					cancelText='Tidak'
				>
					<Button
						loading={loading}
						className='w-full btn-custom md:mb-[14px] md:mr-0 mb-0 mr-4 border border-solid border-red-500 bg-red-500 hover:bg-red-400 active:bg-red-400 hover:border-red-400 active:border-red-400'
						type='primary'
						htmlType='submit'
					>
						Hapus
					</Button>
				</Popconfirm>
			)}
		</>
	);
};

export default function ProductSidebar(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const offerDetail = useSelector((state) => state.transaction.offer.response);
	const profileUser = useSelector((state) => state.user.user.data);
	const loadingWishlist = useSelector((state) => state.product.wishlist.loading);
	const token = useSelector((state) => state.user.auth.token);
	const offersEvents = { click: () => {} };
	const [isWishlist, setWishlist] = useState(false);
	const [isOffered, setOffered] = useState(false);

	const handleEdit = () => {
		navigate('/update/product/' + props.id);
	};

	const checkWishlistHandler = async (productId) => {
		const response = await axios.get(
			`https://thriftorzo-api.herokuapp.com/wishlist/status?productId=${productId}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		setWishlist(response.data.wishlistStatus);
	};

	const checkStatusTransaction = async (productId) => {
		const response = await axios.get(
			`https://thriftorzo-api.herokuapp.com/transaction/status?productId=${productId}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		setOffered(response.data.status);
	};

	const addWishlistHandler = async (productId) => {
		await dispatch(addToWishlist({ token, productId }));
		notification.open({
			message: 'Berhasil Menambah Wishlist!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
		});
		checkWishlistHandler(productId);
	};

	const removeWishlistHandler = async (productId) => {
		await dispatch(removeWishlist({ token, productId }));
		notification.open({
			message: 'Berhasil Menghapus Wishlist!',
			className: 'global-alert-success',
			placement: 'top',
			duration: 3,
		});
		checkWishlistHandler(productId);
	};

	useEffect(() => {
		if (profileUser) {
			const productId = props.id;
			checkWishlistHandler(productId);
			checkStatusTransaction(productId);
		}
	}, []);

	useEffect(() => {
		if (profileUser) {
			const productId = props.id;
			checkStatusTransaction(productId);
		}
	}, [offerDetail]);

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
			<div
				className={`sidebar-product p-4 shadow-custom md:mb-6 mb-4 rounded-2xl ${
					!props.mobile ? 'md:block hidden' : 'md:hidden block'
				} z-10 relative bg-white`}
			>
				{!props.loading && (
					<>
						<h4 className='text-base text-black mb-2'>{props.name}</h4>
						<p className='text-sm text-[#8A8A8A] mb-4'>{props.category}</p>
						{!!props.price && (
							<p className={`text-base text-black ${props.mobile || !profileUser ? 'mb-0' : 'mb-6'}`}>
								{currency(props.price)}
							</p>
						)}
					</>
				)}
				{props.loading && <Skeleton active paragraph={{ rows: 4 }} />}
				<div className='md:static md:block fixed flex justify-between md:left-auto md:bottom-auto left-4 right-4 bottom-4'>
					{!props.loading && !!profileUser && profileUser.id === props.userId && (
						<>
							<ProductStatus id={props.id} publish={props.publish} />
							<Button onClick={handleEdit} ghost className='w-full btn-custom' type='primary'>
								Edit
							</Button>
						</>
					)}
					{!props.loading && !!profileUser && profileUser.id !== props.userId && (
						<Button
							disabled={isOffered}
							onClick={() => offersEvents.click()}
							className='w-full btn-custom border border-solid border-[#9f42f3]'
							type='primary'
							htmlType='submit'
						>
							Saya tertarik dan ingin nego
						</Button>
					)}
				</div>
				{!props.loading && !!profileUser && profileUser.id !== props.userId && !isWishlist && (
					<Button
						loading={loadingWishlist}
						onClick={() => addWishlistHandler(props.id)}
						className='mt-4 w-full btn-custom border border-solid border-[#9f42f3]'
						type='primary'
						htmlType='submit'
						ghost
					>
						Tambah ke wishlist
					</Button>
				)}
				{!props.loading && !!profileUser && profileUser.id !== props.userId && isWishlist && (
					<Button
						loading={loadingWishlist}
						onClick={() => removeWishlistHandler(props.id)}
						className='mt-4 w-full btn-custom border border-solid border-[#9f42f3]'
						type='primary'
						htmlType='submit'
						ghost
					>
						Hapus dari wishlist
					</Button>
				)}
			</div>
			<ModalOffer
				name={props.name}
				image={props.imgUrl ? props.imgUrl[0] : ''}
				price={props.price}
				id={props.id}
				events={offersEvents}
			/>
		</>
	);
}
