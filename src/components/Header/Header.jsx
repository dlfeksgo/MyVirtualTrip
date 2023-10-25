import React from 'react';
import styles from './Header.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const Header = () => {
	console.log('Header');
	return (
		<div className={cm('wrapper')}>
			<h1>여행을 떠나요 ✈️</h1>
		</div>
	);
};

export default Header;
