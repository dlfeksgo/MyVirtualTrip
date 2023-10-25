import React from 'react';
import styles from './CategoryItem.module.css';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cm = classnames.bind(styles);

const CategoryItem = ({ categorys }) => {
	const renderedItem = categorys.map((category) => {
		return (
			<Link to={`/category/${category.name}`} key={category.id}>
				<li className={cm('item')}>
					<h3>{category.title}</h3>
					<p>{category.itemList.length}</p>
				</li>
			</Link>
		);
	});
	return (
		<>
			<ul className={cm('wrapper')}>{renderedItem}</ul>
		</>
	);
};

export default CategoryItem;
