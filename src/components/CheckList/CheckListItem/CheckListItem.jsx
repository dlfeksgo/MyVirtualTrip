import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import styles from './CheckListItem.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const CheckListItem = ({ item }) => {
	const [toggle, setToggle] = useState(false);

	const handleChange = (e) => {
		setToggle(!toggle);
	};
	return (
		<li className={cm('wrapper')} onClick={handleChange}>
			<div className={cm('circle', `${toggle && 'checked'}`)}>
				{toggle && <BsCheck />}
			</div>
			<span className={cm('text', `${toggle && 'completed'}`)}>
				{item.content}
			</span>
		</li>
	);
};

export default CheckListItem;
