import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Skeleton } from 'antd';
import { ArrowLeft } from 'react-feather';

import SliderProduct from '../../components/slider-product';
import ProductSidebar from '../../components/product-sidebar';
import SalerInformation from '../../components/saler-information';
import { Helmet } from 'react-helmet';

import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../features/product/productSlice';

import './index.css';

export default function Detail() {
	const navigate = useNavigate();
	const navigateBack = () => {
		navigate(-1);
	};
	const dispatch = useDispatch();
	const { response, loading } = useSelector((state) => state.product.detail);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getProductDetail(id));
	}, [id]);

	return (
		<>
			<Helmet>
				<title>{`${response ? response.name : ''} - Thriftorzo`}</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<div className='container container-internal md:py-10 pt-0 pb-6'>
				<div
					className='product-navigation w-6 h-6 rounded-full bg-white absolute z-10 top-[44px] left-4 md:hidden block cursor-pointer'
					onClick={navigateBack}
				>
					<ArrowLeft size={24} />
				</div>
				<Row gutter={[32, 16]}>
					<Col xs={{ span: 24 }} md={{ span: 16 }}>
						<SliderProduct loading={loading} item={!!response && response.imgUrl} />
						<ProductSidebar
							loading={loading}
							mobile
							id={id}
							publish={!!response && response.publish}
							name={!!response && response.name}
							category={!!response && response.category}
							price={!!response && response.price}
							imgUrl={!!response && response.imgUrl}
							userId={!!response && response.userResponse && response.userResponse.id}
						/>
						<SalerInformation
							user={!!response && response.userResponse}
							mobile
							edit={false}
							loading={loading}
						/>
						<div className='shadow-custom md:mt-6 mt-4 rounded-2xl'>
							<div className='p-4'>
								<h4 className='text-sm text-black mb-4'>Deskripsi</h4>
								{!loading && !!response ? (
									<p className='text-neutralGray text-sm'>{response.description}</p>
								) : (
									<Skeleton active />
								)}
							</div>
						</div>
					</Col>
					<Col className='md:block hidden' xs={{ span: 24 }} md={{ span: 8 }}>
						<ProductSidebar
							loading={loading}
							id={id}
							publish={!!response && response.publish}
							name={!!response && response.name}
							category={!!response && response.category}
							price={!!response && response.price}
							imgUrl={!!response && response.imgUrl}
							userId={!!response && response.userResponse && response.userResponse.id}
						/>
						<SalerInformation loading={loading} user={!!response && response.userResponse} edit={false} />
					</Col>
				</Row>
			</div>
		</>
	);
}
