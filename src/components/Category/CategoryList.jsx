import React, { useRef } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './CategoryList.module.css';
import classnames from 'classnames/bind';
import CategoryItem from './CategoryItem/CategoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../slice/category';
const cm = classnames.bind(styles);

const CategoryList = () => {
	const dispatch = useDispatch();
	const categorys = useSelector((state) => state.category);

	const nextId = useRef(1);
	const handleCreate = () => {
		const name = prompt('카테고리 이름을 입력해주세요.');
		if (name === null || name.length < 2) {
			return alert('이름을 입력해주세요.');
		}
		const title = prompt('카테고리를 설명할 제목을 입력해주세요.');
		if (title === null || title === '') {
			return alert('카테고리를 입력해주세요.');
		}

		const newData = {
			id: nextId.current,
			name,
			title,
			itemList: [],
		};

		dispatch(createCategory(newData));
		nextId.current += 1;
	};

	return (
		<main className={cm('wrapper')}>
			<div className={cm('add')} onClick={handleCreate}>
				<AiOutlinePlusCircle />
			</div>
			{categorys && <CategoryItem categorys={categorys} />}
		</main>
	);
};

export default CategoryList;
