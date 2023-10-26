import React from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './ItemForm.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const ItemForm = () => {
	return (
		<div className={cm('wrapper')}>
			<input type="text" />
			<MyButton value={'+'} type={'confirm'} />
		</div>
	);
};

export default ItemForm;
