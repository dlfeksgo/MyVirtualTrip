import classnames from 'classnames/bind';
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { useParams } from 'react-router';
import { useItemById } from '../../../hooks/useCategory';
import styles from './CheckListItem.module.css';
const cm = classnames.bind(styles);

const CheckListItem = ({ item }) => {
	const { name } = useParams();

	const {
		itemQuery: { data, isLoading },
		updateItem,
		deleteItem,
	} = useItemById({ name, ...item });

	const handleChange = () => updateItem.mutate({ name, ...data });

	const handleDelete = () => deleteItem.mutate({ name, ...data });

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<li className={cm('wrapper')}>
			<div className={cm('content')} name="check" onClick={handleChange}>
				<div className={cm('circle', `${data.isCompleted && 'checked'}`)}>{data.isCompleted && <BsCheck />}</div>
				<span className={cm('text', `${data.isCompleted && 'completed'}`)}>{data.content}</span>
			</div>
			<div>
				<button className={cm('btn_delete')} onClick={handleDelete}>
					<AiFillDelete />
				</button>
			</div>
		</li>
	);
};

export default CheckListItem;
