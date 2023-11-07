import React, { useState } from 'react';
import ItemForm from './Form/ItemForm';
import MyHeader from '../UI/MyHeader/MyHeader';
import MyButton from '../UI/MyButton/MyButton';
import { useNavigate, useParams } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import CheckListItem from './CheckListItem/CheckListItem';
import styles from './CheckList.module.css';
import classnames from 'classnames/bind';
import ItemFilter from './Filter/ItemFilter';
import { selectCategorys } from '../../slice/category';
import { selectFilter } from '../../slice/filter';
const cm = classnames.bind(styles);

const selectItemsByCategory = createSelector(
	[selectCategorys, (state, name) => name, selectFilter],
	(categorys, name, status) => {
		const { itemList } = categorys.find((category) => category.name === name);
		switch (status) {
			case '전체':
				return itemList.map((item) => item.id);
			case '완료':
				return itemList
					.filter((item) => item.isCompleted)
					.map((item) => item.id);
			case '미완료':
				return itemList
					.filter((item) => !item.isCompleted)
					.map((item) => item.id);
			default:
				return itemList.map((item) => item.id);
		}
	}
);

const CheckList = () => {
	console.log('CheckList');
	const { name } = useParams();
	const navigate = useNavigate();
	const items = useSelector(
		(state) => selectItemsByCategory(state, name),
		shallowEqual
	);

	return (
		<div className={cm('wrapper')}>
			<MyHeader
				value={name}
				leftChild={
					<MyButton
						value={'이전'}
						type={'default'}
						onClick={() => navigate(-1)}
					/>
				}
			/>
			<ItemFilter />
			<ul className={cm('list')}>
				{items &&
					items.map((itemId) => <CheckListItem key={itemId} itemId={itemId} />)}
			</ul>
			<ItemForm category={name} />
		</div>
	);
};

export default CheckList;
