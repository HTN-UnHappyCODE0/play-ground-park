import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface IUser {
	accessToken: string;
	refreshToken: string;
	accessExpiresAt: string;
	refreshExpiresAt: string;
	avatar: string;
	fullname: string;
}

export interface UserState {
	infoUser: IUser | null;
}

const initialState: UserState = {
	infoUser: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setInfoUser: (state, action: PayloadAction<IUser | null>) => {
			state.infoUser = action?.payload;
		},
	},
});

export const {setInfoUser} = userSlice.actions;
export default userSlice.reducer;
