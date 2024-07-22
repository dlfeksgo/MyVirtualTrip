import classnames from 'classnames/bind';
import React from 'react';
import styles from './Header.module.css';
const cm = classnames.bind(styles);

const Header = () => {
	return (
		<div className={cm('wrapper')}>
			<h1>여행을 떠나요 ✈️</h1>
		</div>
	);
};

export default Header;
