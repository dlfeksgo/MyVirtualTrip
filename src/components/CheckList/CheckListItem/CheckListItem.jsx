import React, { memo, useMemo } from 'react';
import { BsCheck } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import styles from './CheckListItem.module.css';
import classnames from 'classnames/bind';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
	deleteItem,
	selectCategorys,
	updateItem,
} from '../../../slice/category';
import { useParams } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';
const cm = classnames.bind(styles);

const makeSelectByItemId = () => {
	const selectByItemId = createSelector(
		[selectCategorys, (state, name) => name, (state, name, itemId) => itemId],
		(categorys, name, itemId) => {
			console.log('first');
			const { itemList } = categorys.find((category) => category.name === name);
			return itemList.find((item) => item.id === itemId);
		}
	);
	return selectByItemId;
};

// const selectByItemId = createSelector(
// 	[selectCategorys, (state, name, itemId) => ({ name, itemId })],
// 	(categorys, { name, itemId }) => {
// 		console.log('first');
// 		const { itemList } = categorys.find((category) => category.name === name);
// 		return itemList.find((item) => item.id === itemId);
// 	}
// );

const CheckListItem = ({ itemId }) => {
	console.log('CheckListItem');
	const { name } = useParams();
	const dispatch = useDispatch();
	const selectByItemId = useMemo(makeSelectByItemId, []);
	const item = useSelector((state) => selectByItemId(state, name, itemId));

	const handleChange = (e) => {
		dispatch(updateItem({ name, id: itemId }));
	};

	const handleDelete = () => {
		dispatch(deleteItem({ name, id: itemId }));
	};

	return (
		<li className={cm('wrapper')}>
			<div className={cm('content')} name="check" onClick={handleChange}>
				<div className={cm('circle', `${item.isCompleted && 'checked'}`)}>
					{item.isCompleted && <BsCheck />}
				</div>
				<span className={cm('text', `${item.isCompleted && 'completed'}`)}>
					{item.content}
				</span>
			</div>
			<div>
				<button className={cm('btn_delete')} onClick={handleDelete}>
					<AiFillDelete />
				</button>
			</div>
		</li>
	);
};

export default CheckListItem;
