import React, { useState } from 'react';
import ItemForm from './Form/ItemForm';
import MyHeader from '../UI/MyHeader/MyHeader';
import MyButton from '../UI/MyButton/MyButton';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import CheckListItem from './CheckListItem/CheckListItem';
import styles from './CheckList.module.css';
import classnames from 'classnames/bind';
import ItemFilter from './Filter/ItemFilter';
const cm = classnames.bind(styles);

const selectCategorys = (state) => state.category;
const selectItemsByCategory = createSelector(
	[selectCategorys, (state, name) => name],
	(categorys, name) => {
		console.log('Selector');
		const category = categorys.find((category) => category.name === name);
		return category.itemList;
	}
);

const CheckList = () => {
	console.log('CheckList');
	const { name } = useParams();
	const navigate = useNavigate();
	const items = useSelector((state) => selectItemsByCategory(state, name));
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
					items.map((item) => <CheckListItem key={item.id} item={item} />)}
			</ul>
			<ItemForm category={name} />
		</div>
	);
};

export default CheckList;
