import React, { useEffect } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import styles from './TripInfo.module.css';
import { AiOutlineEdit } from 'react-icons/ai';
import classnames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router';
const cm = classnames.bind(styles);

const TripInfo = () => {
	console.log('TripInfo');
	const navigate = useNavigate();
	const state = JSON.parse(localStorage.getItem('tripInfo'));

	if (state) {
		return (
			<div className={cm('wrapper', 'active')}>
				<div className={cm('content')}>
					<h3>{state.title}</h3>
					<p>{state.date}</p>
				</div>
				<button
					className={cm('edit')}
					onClick={() => navigate('/info/edit', { state })}
				>
					<AiOutlineEdit />
				</button>
			</div>
		);
	}

	return (
		<div className={cm('wrapper', 'default')}>
			<p>등록된 일정이 없어요 🫥</p>
			<MyButton
				value={'등록'}
				type={'confirm'}
				onClick={() => navigate('/info')}
			/>
		</div>
	);
};

export default TripInfo;
