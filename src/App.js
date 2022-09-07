import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './components/layouts/auth';
import DefaultLayout from './components/layouts/default';
import DefaultLayoutWithTitle from './components/layouts/default-title';
import DefaultLayoutWithNavigation from './components/layouts/default-navigation';
import DefaultLayoutBlank from './components/layouts/default-blank';
import IsAuth from './components/layouts/isAuth';
import IsGuest from './components/layouts/isGuest';
import CheckUserProfile from './components/layouts/checkUserProfile';
import CheckProductLimit from './components/layouts/checkProductLimit';

import Home from './pages/home/index';
import Login from './pages/login/index';
import Register from './pages/register/index';
import Profile from './pages/profile/index';
import ProductForm from './pages/create-product/index';
import ProductFormUpdate from './pages/update-product/index';
import Notification from './pages/notification';
import Detail from './pages/detail';
import DaftarJual from './pages/daftar-jual';
import Wishlist from './pages/wishlist';
import Terjual from './pages/terjual';
import InfoPenawaran from './pages/info-penawaran';
import SaleHistory from './pages/sale-history';
import BuyHistory from './pages/buy-history';
import Setting from './pages/setting';
import Password from './pages/password';
import PageNotFound from './pages/404';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route element={<IsGuest />}>
						<Route exact path='/login' element={<Login />} />
						<Route exact path='/register' element={<Register />} />
					</Route>
				</Route>
				<Route element={<IsAuth />}>
					<Route element={<DefaultLayoutWithTitle />}>
						<Route exact path='/notification' element={<Notification />} />
					</Route>
					<Route element={<DefaultLayoutWithNavigation />}>
						<Route exact path='/setting' element={<Setting />} />
						<Route exact path='/setting/profile' element={<Profile />} />
						<Route exact path='/setting/password' element={<Password />} />
						<Route exact path='/penawaran/info-penawaran/:id' element={<InfoPenawaran />} />
					</Route>
					<Route element={<DefaultLayoutBlank />}>
						<Route element={<CheckUserProfile />}>
							<Route element={<CheckProductLimit />}>
								<Route exact path='/create/product' element={<ProductForm />} />
							</Route>
							<Route exact path='/update/product/:id' element={<ProductFormUpdate />} />
						</Route>
					</Route>
				</Route>
				<Route element={<DefaultLayout />}>
					<Route exact path='/*' element={<PageNotFound />} />
					<Route exact path='/' element={<Home />} />
					<Route exact path='/product/detail/:id' element={<Detail />} />
					<Route element={<IsAuth />}>
						<Route exact path='/aktivitas' element={<DaftarJual />} />
						<Route exact path='/aktivitas/wishlist' element={<Wishlist />} />
						<Route exact path='/aktivitas/terjual' element={<Terjual />} />
						<Route exact path='/aktivitas/tawaran' element={<SaleHistory />} />
						<Route exact path='/aktivitas/pembelian' element={<BuyHistory />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
