import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from '../slice/category';
import filterSlice from '../slice/filter';

export const store = configureStore({
	reducer: {
		category: categorySlice.reducer,
		filter: filterSlice.reducer,
	},
});
