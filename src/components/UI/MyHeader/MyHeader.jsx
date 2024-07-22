import classnames from 'classnames/bind';
import React from 'react';
import styles from './MyHeader.module.css';
const cm = classnames.bind(styles);

const MyHeader = ({ value, leftChild, rightChild }) => {
	return (
		<div className={cm('wrapper')}>
			<div className={cm('left')}>{leftChild}</div>
			<h1>{value}</h1>
			<div className={cm('right')}>{rightChild}</div>
		</div>
	);
};

export default MyHeader;
