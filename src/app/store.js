import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import productSlice from '../features/product/productSlice';
import transactionSlice from '../features/transaction/transactionSlice';
import notificationSlice from '../features/notification/notificationSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		product: productSlice,
		transaction: transactionSlice,
		notification: notificationSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
