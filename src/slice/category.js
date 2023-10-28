import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const categorySlice = createSlice({
	name: 'category',
	initialState: [
		{
			id: 0,
			name: '테스트',
			title: '테스트 제목',
			itemList: [
				{
					id: 0,
					content: '테스트 내용',
					isCompleted: true,
				},
			],
		},
	],
	reducers: {
		createCategory: (state, action) => {
			state.push(action.payload);
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

export const { createCategory, createItem, updateItem, deleteItem } =
	categorySlice.actions;
