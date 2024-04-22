import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	email: '',
	id: '',
	isAdmin: false,
	access_token: '',
	refresh_token: '',
};

export const userSlide = createSlice({
	name: 'user',
	initialState,
	reducer: {
		updateUser: (state, action) => {
			const { name, email, id, isAdmin, access_token, refresh_token } = action.payload;
			state.name = name ? name : state.name;
			state.email = email ? email : state.email;
			state.id = id ? id : state.id;
			state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
			state.access_token = access_token ? access_token : state.access_token;
			state.refresh_token = refresh_token ? refresh_token : state.refresh_token;
		},
		resetUser: (state) => {
			state.name = '';
			state.email = '';
			state.id = '';
			state.isAdmin = false;
			state.access_token = '';
			state.refresh_token = '';
		},
	},
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
