import React from 'react';
import styles from './MyButton.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const MyButton = ({ value, onClick, type, submit }) => {
	return (
		<button
			type={submit ? 'submit' : 'button'}
			onClick={onClick}
			className={cm(`${type}`, 'btn_custom')}
		>
			{value}
		</button>
	);
};

export default MyButton;
