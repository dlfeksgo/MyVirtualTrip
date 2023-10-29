import React, { memo } from 'react';
import { StatusFilters, statusFilterChanged } from '../../../slice/filter';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ItemFilter.module.css';
import classnames from 'classnames/bind';
const cm = classnames.bind(styles);

const ItemFilter = () => {
	console.log('Filter Render');
	const activeFilter = useSelector((state) => state.filter.status);
	const dispatch = useDispatch();
	const renderedFilters = Object.keys(StatusFilters).map((key) => {
		const value = StatusFilters[key];
		const handleFilter = () => dispatch(statusFilterChanged(value));
		const active = activeFilter === value ? true : false;
		return (
			<li key={key}>
				<button onClick={handleFilter} className={cm(`${active && 'active'}`)}>
					{value}
				</button>
			</li>
		);
	});
	return <ul className={cm('wrapper')}>{renderedFilters}</ul>;
};

export default memo(ItemFilter);
