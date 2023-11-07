import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const categorySlice = createSlice({
	name: 'category',
	initialState: [
		{
			id: 1,
			name: '테스트',
			title: '테스트',
			itemList: [],
		},
	],
	reducers: {
		createCategory: (state, action) => {
			state.push({
				...action.payload,
				id: uuidv4(),
			});
		},
		createItem: (state, action) => {
			const category = state.find((v) => v.name === action.payload.category);
			category.itemList.push({
				...action.payload.newData,
				id: uuidv4(),
			});
		},
		updateItem: (state, action) => {
			const category = state.find((v) => v.name === action.payload.name);
			category.itemList = category.itemList.map((v) =>
				v.id === action.payload.id ? { ...v, isCompleted: !v.isCompleted } : v
			);
		},
		deleteItem: (state, action) => {
			const category = state.find((v) => v.name === action.payload.name);
			category.itemList = category.itemList.filter(
				(item) => item.id !== action.payload.id
			);
		},
	},
});

export const selectCategorys = (state) => state.category;

export const { createCategory, createItem, updateItem, deleteItem } =
	categorySlice.actions;
