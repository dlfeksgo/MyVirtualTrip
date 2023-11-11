import React, { memo, useState } from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './ItemForm.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const ItemForm = ({ category, addItem }) => {
	// const dispatch = useDispatch();
	// const { addItem } = useCategoryItemList();
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
		addItem.mutate(newData);
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
