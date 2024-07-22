import classnames from 'classnames/bind';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useCategory } from '../../hooks/useCategory';
import CategoryItem from './CategoryItem/CategoryItem';
import styles from './CategoryList.module.css';
const cm = classnames.bind(styles);

const CategoryList = () => {
	const [success, setSuccess] = useState('');
	const {
		categorysQuery: { data: categorys, isError },
		createCategory,
	} = useCategory();

	const handleCreate = () => {
		const name = prompt('카테고리 이름을 입력해주세요.');
		if (name === null || name.length < 2) {
			return alert('이름을 입력해주세요.');
		}
		const title = prompt('카테고리를 설명할 제목을 입력해주세요.');
		if (title === null || title === '') {
			return alert('카테고리를 입력해주세요.');
		}
		createCategory.mutateAsync({ name, title }).then(() => {
			setSuccess('✅ 카테고리 등록 성공!');
			setTimeout(() => {
				setSuccess('');
			}, 3000);
		});
	};

	if (isError) {
		return <strong>Error 발생! 잠시 후 다시 시도해주세요.</strong>;
	}

	return (
		<main className={cm('wrapper')}>
			{success && <strong>{success}</strong>}
			<div className={cm('add')} onClick={handleCreate}>
				<AiOutlinePlusCircle />
			</div>
			{categorys && <CategoryItem categorys={categorys} />}
		</main>
	);
};

export default CategoryList;
