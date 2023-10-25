import React from 'react';
import styles from './MyHeader.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const MyHeader = ({ value, leftChild, rightChild }) => {
	return (
		<div className={cm('wrapper')}>
			{leftChild ? leftChild : <div></div>}
			<h1>{value}</h1>
			{rightChild ? rightChild : <div></div>}
		</div>
	);
};

export default MyHeader;
