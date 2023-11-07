import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export const createCategory = async ({ name, title }) => {
	const id = uuid();
	return set(ref(db, `categorys/${name}`), {
		id,
		name,
		title,
	});
};

export const getCategorys = async () => {
	return get(ref(db, 'categorys')).then((snapshot) => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return [];
	});
};

export const getItems = async (name) => {
	return get(ref(db, `categorys/${name}/itemList`)).then((snapshot) => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return [];
	});
};

export const addNewItem = (item) => {
	const id = uuid();
	set(ref(db, `categorys/${item.name}/itemList/${id}`), {
		id,
		content: item.content,
		isCompleted: item.isCompleted,
	});
};
