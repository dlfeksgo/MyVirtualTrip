import { createSlice } from '@reduxjs/toolkit';

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
	},
});

export const { createCategory } = categorySlice.actions;
