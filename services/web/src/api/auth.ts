import axios from 'axios';
import { environment } from '../constants/env';
import { IUser } from '../interfaces/user';

const getMe = async () => {
	const me = await axios.get<IUser>(`${environment.api}/auth/me`);
	return me;
};

export const authApi = { getMe };
