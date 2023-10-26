import React from 'react';
import styles from './MyHeader.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const MyHeader = ({ value, leftChild, rightChild }) => {
	return (
		<div className={cm('wrapper')}>
			<div>{leftChild}</div>
			<h1>{value}</h1>
			<div>{rightChild}</div>
		</div>
	);
};

export default MyHeader;
