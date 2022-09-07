import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const API_URL = 'https://thriftorzo-api.herokuapp.com/';
export let TOKEN = localStorage.getItem('token');
export let USER = JSON.parse(localStorage.getItem('user'));

export const auth = createAsyncThunk('user/auth', async (values, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${API_URL}auth/signin`, values);
		if (response.status === 200) {
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', JSON.stringify(response.data));
			TOKEN = response.data.token;
			USER = response.data;
			return response;
		} else {
			rejectWithValue(response);
		}
	} catch (err) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const register = createAsyncThunk('user/register', async (values, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${API_URL}auth/signup`, values);
		if (response.status === 200) {
			return response;
		} else {
			rejectWithValue(response);
		}
	} catch (err) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
	try {
		if (TOKEN) {
			const response = await axios.get(`${API_URL}user/get`, {
				headers: { Authorization: `Bearer ${TOKEN}` },
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

export const updateUser = createAsyncThunk('user/updateUser', async (values, { rejectWithValue }) => {
	try {
		if (TOKEN) {
			const response = await axios.put(`${API_URL}user/update-data`, values, {
				headers: { Authorization: `Bearer ${TOKEN}` },
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

export const changePassword = createAsyncThunk('user/changePassword', async (values, { rejectWithValue }) => {
	try {
		if (TOKEN) {
			const response = await axios.put(`${API_URL}user/password`, values, {
				headers: { Authorization: `Bearer ${TOKEN}` },
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

const initialState = {
	auth: {
		token: TOKEN || null,
		loading: false,
		error: false,
		errorMessage: null,
		success: TOKEN ? true : false,
	},
	register: {
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
	user: {
		data: USER || null,
		loading: false,
		error: false,
		errorMessage: null,
		success: TOKEN ? true : false,
	},
	update: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
	password: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
};

const logoutState = {
	...initialState,
	auth: {
		token: null,
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
	user: {
		data: null,
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
};

const resetPasswordState = {
	...initialState,
	password: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
};

const afterRegisterState = {
	...initialState,
	auth: {
		token: null,
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
	register: {
		loading: false,
		error: false,
		errorMessage: null,
		success: false,
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: () => logoutState,
		afterResetPassword: () => resetPasswordState,
		afterRegister: () => afterRegisterState,
	},
	extraReducers: {
		// =================================================== LOGIN =================================================== //
		[auth.pending]: (state) => {
			state.auth.loading = true;
		},
		[auth.fulfilled]: (state, action) => {
			state.auth.token = action.payload.data.token;
			state.auth.success = true;
			state.auth.error = false;
			state.auth.errorMessage = null;
			state.auth.loading = false;
		},
		[auth.rejected]: (state, action) => {
			state.auth.success = false;
			state.auth.error = action.error.message;
			state.auth.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.auth.loading = false;
		},
		// =================================================== REGISTER =================================================== //
		[register.pending]: (state) => {
			state.register.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.register.error = false;
			state.register.errorMessage = null;
			state.register.loading = false;
			state.register.success = true;
		},
		[register.rejected]: (state, action) => {
			state.register.error = action.error.message;
			state.register.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.register.loading = false;
			state.register.success = false;
		},
		// =================================================== USER =================================================== //
		[getUser.pending]: (state) => {
			state.user.loading = true;
		},
		[getUser.fulfilled]: (state, action) => {
			state.user.data = action.payload.data;
			state.user.error = false;
			state.user.errorMessage = null;
			state.user.loading = false;
			state.user.success = true;
		},
		[getUser.rejected]: (state, action) => {
			state.user.success = false;
			state.user.error = action.error.message;
			state.user.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.user.loading = false;
		},

		// =================================================== UPDATE USER =================================================== //
		[updateUser.pending]: (state) => {
			state.update.loading = true;
		},
		[updateUser.fulfilled]: (state, action) => {
			state.update.response = action.payload.data;
			state.update.success = true;
			state.update.error = false;
			state.update.errorMessage = null;
			state.update.loading = false;
		},
		[updateUser.rejected]: (state, action) => {
			state.update.success = false;
			state.update.error = action.error.message;
			state.update.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.update.loading = false;
		},

		// =================================================== UPDATE USER =================================================== //
		[changePassword.pending]: (state) => {
			state.password.loading = true;
		},
		[changePassword.fulfilled]: (state, action) => {
			state.password.response = action.payload.data;
			state.password.success = true;
			state.password.error = false;
			state.password.errorMessage = null;
			state.password.loading = false;
		},
		[changePassword.rejected]: (state, action) => {
			state.password.response = null;
			state.password.success = false;
			state.password.error = action.error.message;
			state.password.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.password.loading = false;
		},
	},
});

export const { reset, afterResetPassword, afterRegister } = userSlice.actions;

export default userSlice.reducer;
