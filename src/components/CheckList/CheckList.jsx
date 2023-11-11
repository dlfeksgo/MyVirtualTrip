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
import { selectFilter } from '../../slice/filter';
import { useCategoryItemList } from '../../hooks/useCategory';
const cm = classnames.bind(styles);

const selectItemsByCategory = createSelector(
	[selectFilter, (state, items) => items],
	(status, items) => {
		switch (status) {
			case '전체':
				return items;
			case '완료':
				return items?.filter((item) => item.isCompleted);
			case '미완료':
				return items?.filter((item) => !item.isCompleted);

			default:
				return items;
		}
	}
);

const CheckList = () => {
	console.log('CheckList');
	const { name } = useParams();
	const navigate = useNavigate();
	const [isEdit, setIsEdit] = useState(false);
	const {
		itemListQuery: { data: itemList, isLoading, refetch },
		addItem,
	} = useCategoryItemList(name);

	const items = useSelector((state) => selectItemsByCategory(state, itemList));

	const handleEdit = () => {
		if (isEdit) {
			refetch();
		}
		setIsEdit(!isEdit);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

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
				rightChild={
					<MyButton
						value={isEdit ? '저장' : '편집'}
						type={'default'}
						onClick={handleEdit}
					/>
				}
			/>
			<ItemFilter refetch={refetch} isEdit={isEdit} />
			<ul className={cm('list')}>
				{items &&
					items.map((item) => (
						<CheckListItem key={item.id} item={item} isEdit={isEdit} />
					))}
			</ul>
			<ItemForm category={name} addItem={addItem} />
		</div>
	);
};

export default CheckList;
