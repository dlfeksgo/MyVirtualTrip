import React, { memo, useState } from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './ItemForm.module.css';
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { createItem } from '../../../slice/category';
import { addNewItem } from '../../../api/firebase';
const cm = classnames.bind(styles);

const ItemForm = ({ category }) => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const handleChange = (e) => {
		setText(e.target.value);
	};
	const handleSubmit = () => {
		const newData = {
			name: category,
			content: text,
			isCompleted: false,
		};
		// dispatch(createItem({ category, newData }));
		addNewItem(newData);
		setText('');
	};

	return (
		<div className={cm('wrapper')}>
			<input type="text" value={text} onChange={handleChange} />
			<MyButton value={'+'} type={'confirm'} onClick={handleSubmit} />
		</div>
	);
};

export default memo(ItemForm);
