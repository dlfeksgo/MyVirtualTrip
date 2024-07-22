import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const createCategory = async ({ name, title }) => {
	const id = uuid();
	return set(ref(db, `categorys/${name}`), {
		id,
		name,
		title,
	});
};

export const deleteCategory = async (name) => {
	remove(ref(db, `categorys/${name}`));
};

export const getCategorys = async () =>
	get(ref(db, 'categorys'))
		.then((snapshot) => {
			if (snapshot.exists()) {
				const origin = Object.values(snapshot.val());
				return origin.map((v) => (v.itemList ? { ...v, itemList: Array.from(Object.values(v.itemList)) } : v));
			}
			return [];
		})
		.catch((err) => console.log(err));

export const getItems = async (name) =>
	get(ref(db, `categorys/${name}/itemList`)).then((snapshot) => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return [];
	});

export const addNewItem = async (item) => {
	const id = new Date().getTime();
	const value = {
		id,
		content: item.content,
		isCompleted: item.isCompleted,
	};
	set(ref(db, `categorys/${item.name}/itemList/${id}`), value).then(() => console.log('성공'));
	return get(ref(db, `categorys/${item.name}/itemList/${id}`)).then((snapshot) => {
		if (snapshot.exists()) {
			return snapshot.val();
		}
		return;
	});
};

export const updateItemStatus = async (data) =>
	set(ref(db, `categorys/${data.name}/itemList/${data.id}`), {
		...data,
		isCompleted: !data.isCompleted,
	});

export const deleteItem = async (data) => {
	remove(ref(db, `categorys/${data.name}/itemList/${data.id}`));
};

export const getItem = async (data) =>
	get(ref(db, `categorys/${data.name}/itemList/${data.id}`)).then((snapshot) => {
		if (snapshot.exists()) {
			return snapshot.val();
		}
		return;
	});
