import React, { useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Product from '../../components/product';
import CategorySidebar from '../../components/category-sidebar';
import SalerInformation from '../../components/saler-information';
import Empty from '../../components/empty';
import LoadingProductSold from '../../components/loadingProductSold';

import { useSelector, useDispatch } from 'react-redux';
import { getWishlist } from '../../features/product/productSlice';

import './index.css';

export default function Wishlist() {
	const token = useSelector((state) => state.user.auth.token);
	const user = useSelector((state) => state.user.user.data);
	const { response, loading } = useSelector((state) => state.product.userWishlist);
	const dispatch = useDispatch();
	const userId = user ? user.id : '';
	const location = useLocation();

	const paginationHandler = (current) => {
		dispatch(getWishlist(token, userId, current - 1));
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		const current = 0;
		dispatch(getWishlist({ token, userId, current }));
	}, [location.pathname]);

	return (
		<div className='page-daftar-jual md:py-10 py-4'>
			<Helmet>
				<title>Wishlist</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='container container-internal'>
				<h1 className='text-xl text-black font-bold mb-6 md:block hidden'>Aktivitas Saya</h1>
				<SalerInformation user={user} edit />
				<Row gutter={[32, 24]} className='pt-6'>
					<Col xs={{ span: 24 }} lg={{ span: 8 }}>
						<CategorySidebar />
					</Col>
					<Col xs={{ span: 24 }} lg={{ span: 16 }}>
						<Row gutter={[24, 24]} className='mb-10'>
							{!loading && !response && (
								<Empty message='Kamu belum menambahkan produk kedalam wishlist kamu, <br /> ayo tambah sekarang' />
							)}
							{loading && <LoadingProductSold />}
							{!loading &&
								!!response &&
								response.productResponses &&
								response.productResponses.length > 0 &&
								response.productResponses.map((i, index) => (
									<Col key={index} xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
										<Product
											img={i.imgUrl[0]}
											title={i.name}
											category={i.category}
											price={i.price}
											link={i.id}
										/>
									</Col>
								))}
						</Row>
						{!loading && !!response && response.totalPage > 1 && (
							<Pagination
								className='mb-10'
								onChange={paginationHandler}
								defaultCurrent={1}
								current={!!response && response.currentPage + 1}
								total={!!response && response.totalElement}
								pageSize={14}
							/>
						)}
					</Col>
				</Row>
			</div>
		</div>
	);
}
