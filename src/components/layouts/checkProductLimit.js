import React, { useEffect } from 'react';
import { notification } from 'antd';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductByUserId } from '../../features/product/productSlice';

export default function CheckProductLimit(props) {
	const location = useLocation();
	const token = useSelector((state) => state.user.auth.token);

	const { response } = useSelector((state) => state.product.productByUserId);
	const dispatch = useDispatch();

	useEffect(() => {
		const current = 0;
		dispatch(getProductByUserId({ token, current }));
	}, [location.pathname]);

	if (response?.totalElement >= 4) {
		notification.destroy();
		notification.open({
			message: 'Produk anda sudah melebihi batas!',
			className: 'global-alert-error',
			placement: 'top',
			duration: 3,
		});
		return <Navigate to='/aktivitas' state={{ from: location }} />;
	}

	return <Outlet {...props} />;
}
