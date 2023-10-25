import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from '../slice/category';

export const store = configureStore({
	reducer: {
		category: categorySlice.reducer,
	},
});
