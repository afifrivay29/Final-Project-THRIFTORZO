import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const API_URL = 'https://thriftorzo-api.herokuapp.com/';

export const getNotification = createAsyncThunk(
	'notification/getnotification',
	async ({ token, current, size }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.get(`${API_URL}notification/get?page=${current}&size=${size}`, {
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

export const countUnreadNotif = createAsyncThunk(
	'notification/countUnreadNotif',
	async (token, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.get(`${API_URL}notification/unread`, {
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

export const readNotif = createAsyncThunk('notification/readNotif', async ({ token, id }, { rejectWithValue }) => {
	try {
		if (token) {
			const response = await axios.put(
				`${API_URL}notification/read`,
				{ id: id },
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
});

export const allReadNotif = createAsyncThunk('notification/allReadNotif', async (token, { rejectWithValue }) => {
	try {
		if (token) {
			console.log(token);
			const response = await axios.put(
				`${API_URL}notification/all-read`,
				{ body: 'test' },
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
});

const initialState = {
	notif: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	count: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	read: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	all: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {},
	extraReducers: {
		// =================================================== GET NOTIFICATION =================================================== //
		[getNotification.pending]: (state) => {
			state.notif.loading = true;
		},
		[getNotification.fulfilled]: (state, action) => {
			state.notif.response = action.payload.data;
			state.notif.error = false;
			state.notif.errorMessage = null;
			state.notif.loading = false;
		},
		[getNotification.rejected]: (state, action) => {
			state.notif.response = null;
			state.notif.error = action.error.message;
			state.notif.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.notif.loading = false;
		},
		// =================================================== COUNT NOTIFICATION =================================================== //
		[countUnreadNotif.pending]: (state) => {
			state.count.loading = true;
		},
		[countUnreadNotif.fulfilled]: (state, action) => {
			state.count.response = action.payload.data;
			state.count.error = false;
			state.count.errorMessage = null;
			state.count.loading = false;
		},
		[countUnreadNotif.rejected]: (state, action) => {
			state.count.response = null;
			state.count.error = action.error.message;
			state.count.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.count.loading = false;
		},
		// =================================================== READ NOTIFICATION =================================================== //
		[readNotif.pending]: (state) => {
			state.read.loading = true;
		},
		[readNotif.fulfilled]: (state, action) => {
			state.read.response = action.payload.data;
			state.read.error = false;
			state.read.errorMessage = null;
			state.read.loading = false;
		},
		[readNotif.rejected]: (state, action) => {
			state.read.response = null;
			state.read.error = action.error.message;
			state.read.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.read.loading = false;
		},
		// =================================================== ALL READ NOTIFICATION =================================================== //
		[allReadNotif.pending]: (state) => {
			state.all.loading = true;
		},
		[allReadNotif.fulfilled]: (state, action) => {
			state.all.response = action.payload.data;
			state.all.error = false;
			state.all.errorMessage = null;
			state.all.loading = false;
		},
		[allReadNotif.rejected]: (state, action) => {
			state.all.response = null;
			state.all.error = action.error.message;
			state.all.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.all.loading = false;
		},
	},
});

export const { reset } = notificationSlice.actions;

export default notificationSlice.reducer;
