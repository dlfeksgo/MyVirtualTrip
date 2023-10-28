import React, { memo } from 'react';
import { BsCheck } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import styles from './CheckListItem.module.css';
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../../slice/category';
import { useParams } from 'react-router';
const cm = classnames.bind(styles);

const CheckListItem = ({ item }) => {
	console.log('CheckListItem');
	const { name } = useParams();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch(updateItem({ name, id: item.id }));
	};

	const handleDelete = () => {
		dispatch(deleteItem({ name, id: item.id }));
	};

	return (
		<li className={cm('wrapper')}>
			<div className={cm('content')} name="check" onClick={handleChange}>
				<div className={cm('circle', `${item.isCompleted && 'checked'}`)}>
					{item.isCompleted && <BsCheck />}
				</div>
				<span className={cm('text', `${item.isCompleted && 'completed'}`)}>
					{item.content}
				</span>
			</div>
			<div>
				<button className={cm('btn_delete')} onClick={handleDelete}>
					<AiFillDelete />
				</button>
			</div>
		</li>
	);
};

export default memo(CheckListItem);
