import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const API_URL = 'https://thriftorzo-api.herokuapp.com/';

export const saleHistory = createAsyncThunk(
	'transaction/saleHistory',
	async ({ token, current }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.get(`${API_URL}history/seller?page=${current}&size=10`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				return response;
			} else {
				const data = [
					{
						error: 'Token Not Found',
						message: 'Token Not Found',
					},
				];
				return rejectWithValue(...data);
			}
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	}
);

export const sendOffer = createAsyncThunk(
	'transaction/sendOffer',
	async ({ token, userId, values }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.post(`${API_URL}transaction/buy`, values, {
					headers: { Authorization: `Bearer ${token}` },
				});
				return response;
			} else {
				const data = [
					{
						error: 'Token Not Found',
						message: 'Token Not Found',
					},
				];
				return rejectWithValue(...data);
			}
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	}
);

export const buyHistory = createAsyncThunk(
	'transaction/buyHistory',
	async ({ token, current }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.get(`${API_URL}history/buyer?page=${current}&size=10`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				return response;
			} else {
				const data = [
					{
						error: 'Token Not Found',
						message: 'Token Not Found',
					},
				];
				return rejectWithValue(...data);
			}
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	}
);

export const detailOffer = createAsyncThunk('transaction/detailOffer', async ({ token, id }, { rejectWithValue }) => {
	try {
		if (token) {
			const response = await axios.get(`${API_URL}transaction/get?offerId=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response;
		} else {
			const data = [
				{
					error: 'Token Not Found',
					message: 'Token Not Found',
				},
			];
			return rejectWithValue(...data);
		}
	} catch (err) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const updateStatus = createAsyncThunk(
	'transaction/updateStatus',
	async ({ token, id, status }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.put(
					`${API_URL}transaction/update`,
					{ offerId: id, status: status },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				return response;
			} else {
				const data = [
					{
						error: 'Token Not Found',
						message: 'Token Not Found',
					},
				];
				return rejectWithValue(...data);
			}
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	}
);

const initialState = {
	sale: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	offer: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	status: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	showOffer: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	buy: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
};

export const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {},
	extraReducers: {
		// =================================================== SALE HISTORY =================================================== //
		[saleHistory.pending]: (state) => {
			state.sale.loading = true;
		},
		[saleHistory.fulfilled]: (state, action) => {
			state.sale.response = action.payload.data;
			state.sale.error = false;
			state.sale.errorMessage = null;
			state.sale.loading = false;
		},
		[saleHistory.rejected]: (state, action) => {
			state.sale.response = null;
			state.sale.error = action.error.message;
			state.sale.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.sale.loading = false;
		},
		// =================================================== SEND OFFER =================================================== //
		[sendOffer.pending]: (state) => {
			state.offer.loading = true;
		},
		[sendOffer.fulfilled]: (state, action) => {
			state.offer.response = action.payload.data;
			state.offer.error = false;
			state.offer.errorMessage = null;
			state.offer.loading = false;
		},
		[sendOffer.rejected]: (state, action) => {
			state.offer.response = null;
			state.offer.error = action.error.message;
			state.offer.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.offer.loading = false;
		},
		// =================================================== SEND OFFER =================================================== //
		[detailOffer.pending]: (state) => {
			state.showOffer.loading = true;
		},
		[detailOffer.fulfilled]: (state, action) => {
			state.showOffer.response = action.payload.data;
			state.showOffer.error = false;
			state.showOffer.errorMessage = null;
			state.showOffer.loading = false;
		},
		[detailOffer.rejected]: (state, action) => {
			state.showOffer.response = null;
			state.showOffer.error = action.error.message;
			state.showOffer.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.showOffer.loading = false;
		},
		// =================================================== STATUS OFFER =================================================== //
		[updateStatus.pending]: (state) => {
			state.status.loading = true;
		},
		[updateStatus.fulfilled]: (state, action) => {
			state.status.response = action.payload.data;
			state.status.error = false;
			state.status.errorMessage = null;
			state.status.loading = false;
		},
		[updateStatus.rejected]: (state, action) => {
			state.status.response = null;
			state.status.error = action.error.message;
			state.status.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.status.loading = false;
		},
		// =================================================== BUY HISTORY =================================================== //
		[buyHistory.pending]: (state) => {
			state.buy.loading = true;
		},
		[buyHistory.fulfilled]: (state, action) => {
			state.buy.response = action.payload.data;
			state.buy.error = false;
			state.buy.errorMessage = null;
			state.buy.loading = false;
		},
		[buyHistory.rejected]: (state, action) => {
			state.buy.response = null;
			state.buy.error = action.error.message;
			state.buy.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.buy.loading = false;
		},
	},
});

export const { reset } = transactionSlice.actions;

export default transactionSlice.reducer;
