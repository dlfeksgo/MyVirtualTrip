import React, { useRef } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './CategoryList.module.css';
import classnames from 'classnames/bind';
import CategoryItem from './CategoryItem/CategoryItem';
import { useSelector } from 'react-redux';
import { getCategorys } from '../../api/firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const cm = classnames.bind(styles);

const CategoryList = () => {
	console.log('categoryList');
	// const categorys = useSelector((state) => state.category);
	const { data: categorys } = useQuery({
		queryKey: ['categorys'],
		queryFn: getCategorys,
	});

	const queryClient = useQueryClient();
	const createCategory = useMutation({
		mutationFn: (newCategory) => createCategory(newCategory),
		onSuccess: () => queryClient.invalidateQueries(['categorys']),
	});

	const handleCreate = () => {
		const name = prompt('카테고리 이름을 입력해주세요.');
		if (name === null || name.length < 2) {
			return alert('이름을 입력해주세요.');
		}
		const title = prompt('카테고리를 설명할 제목을 입력해주세요.');
		if (title === null || title === '') {
			return alert('카테고리를 입력해주세요.');
		}
		createCategory.mutate({ name, title });
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
