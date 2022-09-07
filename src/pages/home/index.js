import React, { useEffect, useState } from 'react';
import { Col, Row, Pagination, Button } from 'antd';
import { Search } from 'react-feather';

import Product from '../../components/product';
import SliderHome from '../../components/slider-home';
import SellButton from '../../components/sell-button';
import Empty from '../../components/empty';
import LoadingProduct from '../../components/loadingProduct';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, resetSearch } from '../../features/product/productSlice';

import './index.css';

export default function Home() {
	const [categoryActive, setActive] = useState('Semua');
	const [filterCategory, setCategory] = useState('');
	const [search, setSearch] = useState('');

	const { isSearch, response, loading } = useSelector((state) => state.product.get);
	const dispatch = useDispatch();

	const paginationHandler = (current) => {
		const productName = search;
		const category = filterCategory;
		const page = current - 1;

		dispatch(getProduct({ productName, category, page }));
		window.scrollTo(0, 0);
	};

	const getAllProduct = async () => {
		const page = 0;
		const productName = '';
		const category = '';

		await setCategory('');
		await setSearch('');

		dispatch(getProduct({ productName, category, page }));
	};

	const categoryHandler = (category) => {
		const page = 0;
		const productName = '';

		setCategory(category);
		setActive(category);

		dispatch(getProduct({ productName, category, page }));
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (!isSearch) {
			console.log('reseting');
			getAllProduct();
		}
		console.log('not reset');
	}, [isSearch]);

	return (
		<>
			<Helmet>
				<title>Thriftorzo - Online Thrifting</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<SliderHome />
			<div className='product-section'>
				<div className='container'>
					<h2 className='text-base font-bold mt-10 mb-4'>Telusuri Kategori!</h2>
					<div className='flex mb-10 w-full md:overflow-auto overflow-x-scroll category-warpper'>
						<Button
							className={`${
								categoryActive == 'Semua' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => {
								getAllProduct(), setActive('Semua');
							}}
						>
							Semua
						</Button>
						<Button
							className={`${
								categoryActive == 'Kaos' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Kaos')}
						>
							Kaos
						</Button>
						<Button
							className={`${
								categoryActive == 'Celana' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Celana')}
						>
							Celana
						</Button>
						<Button
							className={`${
								categoryActive == 'Sweater' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Sweater')}
						>
							Sweater
						</Button>
						<Button
							className={`${
								categoryActive == 'Outer' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Outer')}
						>
							Outer
						</Button>
						<Button
							className={`${
								categoryActive == 'Kemeja' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Kemeja')}
						>
							Kemeja
						</Button>
					</div>
					<Row gutter={[16, 16]} className='mb-10'>
						{!loading && !response && <Empty message='Produk yang kamu cari tidak tersedia nih' />}
						{loading && <LoadingProduct />}
						{!loading &&
							!!response &&
							response.productResponses &&
							response.productResponses.length > 0 &&
							response.productResponses.map((i, index) => (
								<Col key={index} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
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
							pageSize={18}
						/>
					)}
				</div>
			</div>
			<SellButton />
		</>
	);
}
