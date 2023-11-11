import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addNewItem,
	createCategory as fetchCategory,
	getCategorys,
	getItems,
	getItem,
	updateItemStatus,
	deleteItem,
} from '../api/firebase';

export const useCategory = () => {
	const categorysQuery = useQuery({
		queryKey: ['categorys'],
		queryFn: getCategorys,
	});

	const queryClient = useQueryClient();
	const createCategory = useMutation({
		mutationFn: (newCategory) => fetchCategory(newCategory),
		onSuccess: () => queryClient.invalidateQueries(['categorys']),
	});

	return { categorysQuery, createCategory };
};

export const useCategoryItemList = (name) => {
	const itemListQuery = useQuery({
		queryKey: ['categorys', name],
		queryFn: () => getItems(name),
		refetchOnWindowFocus: false,
	});

	const queryClient = useQueryClient();

	const addItem = useMutation({
		mutationFn: (newItem) => addNewItem(newItem),
		onSuccess: (data) => {
			queryClient.setQueryData(['categorys', name], (oldData) => {
				return [...oldData, data];
			});
		},
	});

	return { itemListQuery, addItem };
};

export const useItemById = (data) => {
	const itemQuery = useQuery({
		queryKey: ['categorys', data.name, data.id],
		queryFn: () => getItem(data),
		refetchOnWindowFocus: false,
	});

	const queryClient = useQueryClient();
	const updateItem = useMutation({
		mutationFn: (data) => updateItemStatus(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['categorys', data.name, data.id],
			}),
	});

	const deleteItem = useMutation({
		mutationFn: (data) => deleteItem(data),
		onSuccess: () => {
			queryClient.setQueryData(['categorys', data.name], (oldData) =>
				oldData.filter((v) => v.id !== data.id)
			);
		},
	});

	return { itemQuery, updateItem, deleteItem };
};
