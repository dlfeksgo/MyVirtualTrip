import React, { memo, useState } from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './ItemForm.module.css';
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { createItem } from '../../../slice/category';
const cm = classnames.bind(styles);

const ItemForm = ({ category }) => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const handleChange = (e) => {
		setText(e.target.value);
	};
	const handleClick = () => {
		const newData = {
			content: text,
			isCompleted: false,
		};
		dispatch(createItem({ category, newData }));
		setText('');
	};
	return (
		<div className={cm('wrapper')}>
			<input type="text" value={text} onChange={handleChange} />
			<MyButton value={'+'} type={'confirm'} onClick={handleClick} />
		</div>
	);
};

export default memo(ItemForm);
