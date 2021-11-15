import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth';

const getMe = createAsyncThunk('user/fetchingAll', async (_, thunkAPI) => {
	try {
		const { data } = await authApi.getMe();
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue('Error during fetching me info');
	}
});

export const authActions = {
	getMe,
};
