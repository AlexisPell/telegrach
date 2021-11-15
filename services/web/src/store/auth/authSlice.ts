import { IUser } from '../../interfaces/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authActions } from './authActionCreators';

interface AuthState {
	user: IUser | null;
	isLoading: boolean;
	isAuthorized: boolean;
	error: string;
}
const initialState: AuthState = {
	user: null,
	isLoading: false,
	isAuthorized: false,
	error: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<IUser>) => {
			state.user = payload;
		},
	},
	extraReducers: {
		[authActions.getMe.fulfilled.type]: (state, { payload }: PayloadAction<IUser>) => {
			state.user = payload;
			state.isAuthorized = true;
			state.isLoading = false;
		},
		[authActions.getMe.pending.type]: (state) => {
			state.isLoading = true;
		},
		[authActions.getMe.rejected.type]: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
			state.isLoading = false;
			state.isAuthorized = false;
		},
	},
});

export default authSlice.reducer;
