import React from 'react';
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
import { ThreeDots } from 'react-loader-spinner';
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
	const {
		itemListQuery: { data: itemList, isLoading, refetch },
		addItem,
	} = useCategoryItemList(name);

	const items = useSelector((state) => selectItemsByCategory(state, itemList));

	if (isLoading) {
		return (
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="#9fa2b8"
				ariaLabel="three-dots-loading"
				wrapperStyle={{ justifyContent: 'center', margin: 'auto' }}
				wrapperClassName=""
				visible={true}
			/>
		);
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
			/>
			<ItemFilter refetch={refetch} />
			<ul className={cm('list')}>
				{items &&
					items.map((item) => <CheckListItem key={item.id} item={item} />)}
			</ul>
			<ItemForm category={name} addItem={addItem} />
		</div>
	);
};

export default CheckList;
