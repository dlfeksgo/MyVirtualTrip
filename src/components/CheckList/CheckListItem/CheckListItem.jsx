import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import styles from './CheckListItem.module.css';
import classnames from 'classnames/bind';
import { useParams } from 'react-router';
import { useItemById } from '../../../hooks/useCategory';
const cm = classnames.bind(styles);

const CheckListItem = ({ item }) => {
	console.log('CheckListItem');
	const { name } = useParams();

	const {
		itemQuery: { data, isLoading },
		updateItem,
		deleteItem,
	} = useItemById({ name, id: item.id });

	const handleChange = (e) => {
		updateItem.mutate({ name, ...data });
	};

	const handleDelete = () => {
		deleteItem.mutate({ name, ...data });
	};

	if (isLoading) {
		return (
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="#9fa2b8"
				ariaLabel="three-dots-loading"
				wrapperStyle={{ justifyContent: 'center', margin: 'auto' }}
				wrapperClassName=""
				visible={true}
			/>
		);
	}
	return (
		<li className={cm('wrapper')}>
			<div className={cm('content')} name="check" onClick={handleChange}>
				<div className={cm('circle', `${data.isCompleted && 'checked'}`)}>
					{data.isCompleted && <BsCheck />}
				</div>
				<span className={cm('text', `${data.isCompleted && 'completed'}`)}>
					{data.content}
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

export default CheckListItem;
