import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
	name: 'category',
	initialState: [],
	reducers: {
		createCategory: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const { createCategory } = categorySlice.actions;
