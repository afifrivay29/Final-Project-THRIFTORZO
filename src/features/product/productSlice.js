import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const API_URL = 'https://thriftorzo-api.herokuapp.com/';

export const getProduct = createAsyncThunk(
	'product/getProduct',
	async ({ productName, category, page }, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${API_URL}public/all?${productName ? `productName=${productName}&` : ''}${
					category ? `category=${category}&` : ''
				}page=${page}&size=18`
			);
			return response;
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	}
);

export const searchProduct = createAsyncThunk(
	'product/searchProduct',
	async ({ productName, page }, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${API_URL}public/all?${productName ? `productName=${productName}&` : ''}page=${page}&size=18`
			);
			console.log(response);
			return response;
		} catch (err) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue(err.response.data);
		}
	}
);

export const getProductDetail = createAsyncThunk('product/getProductDetail', async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${API_URL}public/product/${id}`);
		return response;
	} catch (err) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async ({ token, id }, { rejectWithValue }) => {
	try {
		if (token) {
			const response = await axios.delete(`${API_URL}product/delete?productId=${id}`, {
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

export const deleteProductImage = createAsyncThunk(
	'product/deleteProductImage',
	async ({ token, url, productId }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.delete(
					`${API_URL}product/delete-image?url=${url}&productId=${productId}`,
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

export const publishProduct = createAsyncThunk(
	'product/publishProduct',
	async ({ token, values }, { rejectWithValue }) => {
		try {
			if (token) {
				let bodyFormData = new FormData();
				bodyFormData.append('productId', values.id);
				bodyFormData.append('name', values.name);
				bodyFormData.append('price', values.price);
				bodyFormData.append('status', values.status);
				bodyFormData.append('publish', values.publish);
				bodyFormData.append('description', values.description);
				bodyFormData.append('category', values.category);

				const response = await axios({
					method: 'put',
					url: `${API_URL}product/update`,
					data: bodyFormData,
					headers: {
						'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
						Accept: '*/*',
						Authorization: `Bearer ${token}`,
					},
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

export const getWishlist = createAsyncThunk('product/getWishlist', async ({ token, current }, { rejectWithValue }) => {
	try {
		if (token) {
			const response = await axios.get(`${API_URL}wishlist/get?page=${current}&size=14`, {
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

export const addToWishlist = createAsyncThunk(
	'product/addToWishlist',
	async ({ token, productId }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.post(
					`${API_URL}wishlist/add`,
					{ productId: productId },
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

export const removeWishlist = createAsyncThunk(
	'product/removeWishlist',
	async ({ token, productId }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.delete(`${API_URL}wishlist/delete?productId=${productId}`, {
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

export const getProductByUserId = createAsyncThunk(
	'product/getProductByUserId',
	async ({ token, current }, { rejectWithValue }) => {
		try {
			if (token) {
				const response = await axios.get(`${API_URL}product/products?page=${current}&size=14`, {
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

export const getSold = createAsyncThunk('product/getSold', async ({ token, current }, { rejectWithValue }) => {
	try {
		if (token) {
			const response = await axios.get(`${API_URL}product/sold?page=${current}&size=14`, {
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

const initialState = {
	get: {
		response: null,
		loading: false,
		isSearch: false,
		error: false,
		errorMessage: null,
	},
	detail: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	deleteImage: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	delete: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	publish: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	wishlist: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	userWishlist: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	productByUserId: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
	sold: {
		response: null,
		loading: false,
		error: false,
		errorMessage: null,
	},
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		resetSearch: (state, payload) => {
			state.get.isSearch = false;
		},
	},
	extraReducers: {
		// =================================================== GET PRODUCT =================================================== //
		[getProduct.pending]: (state) => {
			state.get.loading = true;
		},
		[getProduct.fulfilled]: (state, action) => {
			state.get.response = action.payload.data;
			state.get.error = false;
			state.get.errorMessage = null;
			state.get.loading = false;
			state.get.isSearch = false;
		},
		[getProduct.rejected]: (state, action) => {
			state.get.response = null;
			state.get.error = action.error.message;
			state.get.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.get.loading = false;
			state.get.isSearch = false;
		},
		// =================================================== GET PRODUCT =================================================== //
		[searchProduct.pending]: (state) => {
			state.get.loading = true;
		},
		[searchProduct.fulfilled]: (state, action) => {
			state.get.response = action.payload.data;
			state.get.error = false;
			state.get.errorMessage = null;
			state.get.loading = false;
			state.get.isSearch = true;
		},
		[searchProduct.rejected]: (state, action) => {
			state.get.response = null;
			state.get.error = action.error.message;
			state.get.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.get.loading = false;
			state.get.isSearch = false;
		},
		// =================================================== GET PRODUCT DETAIL =================================================== //
		[getProductDetail.pending]: (state) => {
			state.detail.loading = true;
		},
		[getProductDetail.fulfilled]: (state, action) => {
			state.detail.response = action.payload.data;
			state.detail.error = false;
			state.detail.errorMessage = null;
			state.detail.loading = false;
		},
		[getProductDetail.rejected]: (state, action) => {
			state.detail.error = action.error.message;
			state.detail.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.detail.loading = false;
		},
		// =================================================== DELETE PRODUCT =================================================== //
		[deleteProduct.pending]: (state) => {
			state.delete.loading = true;
		},
		[deleteProduct.fulfilled]: (state, action) => {
			state.delete.response = action.payload.data;
			state.delete.error = false;
			state.delete.errorMessage = null;
			state.delete.loading = false;
		},
		[deleteProduct.rejected]: (state, action) => {
			state.delete.error = action.error.message;
			state.delete.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.delete.loading = false;
		},
		// =================================================== DELETE PRODUCT IMAGE =================================================== //
		[deleteProductImage.pending]: (state) => {
			state.deleteImage.loading = true;
		},
		[deleteProductImage.fulfilled]: (state, action) => {
			state.deleteImage.response = action.payload.data;
			state.deleteImage.error = false;
			state.deleteImage.errorMessage = null;
			state.deleteImage.loading = false;
		},
		[deleteProductImage.rejected]: (state, action) => {
			state.deleteImage.error = action.error.message;
			state.deleteImage.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.deleteImage.loading = false;
		},
		// =================================================== PUBLISH PRODUCT =================================================== //
		[publishProduct.pending]: (state) => {
			state.publish.loading = true;
		},
		[publishProduct.fulfilled]: (state, action) => {
			state.publish.response = action.payload.data;
			state.publish.error = false;
			state.publish.errorMessage = null;
			state.publish.loading = false;
		},
		[publishProduct.rejected]: (state, action) => {
			state.publish.error = action.error.message;
			state.publish.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.publish.loading = false;
		},
		// =================================================== GET WISHLIST =================================================== //
		[getWishlist.pending]: (state) => {
			state.userWishlist.loading = true;
		},
		[getWishlist.fulfilled]: (state, action) => {
			state.userWishlist.response = action.payload.data;
			state.userWishlist.error = false;
			state.userWishlist.errorMessage = null;
			state.userWishlist.loading = false;
		},
		[getWishlist.rejected]: (state, action) => {
			state.userWishlist.response = null;
			state.userWishlist.error = action.error.message;
			state.userWishlist.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.userWishlist.loading = false;
		},
		// =================================================== ADD WISHLIST =================================================== //
		[addToWishlist.pending]: (state) => {
			state.wishlist.loading = true;
		},
		[addToWishlist.fulfilled]: (state, action) => {
			state.wishlist.response = action.payload.data;
			state.wishlist.error = false;
			state.wishlist.errorMessage = null;
			state.wishlist.loading = false;
		},
		[addToWishlist.rejected]: (state, action) => {
			state.wishlist.error = action.error.message;
			state.wishlist.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.wishlist.loading = false;
		},
		// =================================================== REMOVE WISHLIST =================================================== //
		[removeWishlist.pending]: (state) => {
			state.wishlist.loading = true;
		},
		[removeWishlist.fulfilled]: (state, action) => {
			state.wishlist.response = action.payload.data;
			state.wishlist.error = false;
			state.wishlist.errorMessage = null;
			state.wishlist.loading = false;
		},
		[removeWishlist.rejected]: (state, action) => {
			state.wishlist.error = action.error.message;
			state.wishlist.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.wishlist.loading = false;
		},
		// =================================================== PRODUCT BY USER ID =================================================== //
		[getProductByUserId.pending]: (state) => {
			state.productByUserId.loading = true;
		},
		[getProductByUserId.fulfilled]: (state, action) => {
			state.productByUserId.response = action.payload.data;
			state.productByUserId.error = false;
			state.productByUserId.errorMessage = null;
			state.productByUserId.loading = false;
		},
		[getProductByUserId.rejected]: (state, action) => {
			state.productByUserId.error = action.error.message;
			state.productByUserId.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.productByUserId.loading = false;
		},
		// =================================================== GET SOLD PRODUCT =================================================== //
		[getSold.pending]: (state) => {
			state.sold.loading = true;
		},
		[getSold.fulfilled]: (state, action) => {
			state.sold.response = action.payload.data;
			state.sold.error = false;
			state.sold.errorMessage = null;
			state.sold.loading = false;
		},
		[getSold.rejected]: (state, action) => {
			state.sold.response = null;
			state.sold.error = action.error.message;
			state.sold.errorMessage = action.payload.message ? action.payload.message : action.payload.error;
			state.sold.loading = false;
		},
	},
});

export const { resetSearch } = productSlice.actions;

export default productSlice.reducer;
