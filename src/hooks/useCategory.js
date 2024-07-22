import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	addNewItem,
	deleteCategory as deleteCategoryAPI,
	deleteItem as deleteItemAPI,
	createCategory as fetchCategory,
	getCategorys,
	getItem,
	getItems,
	updateItemStatus,
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
		onError: (err) => console.log(err),
	});

	const deleteCategory = useMutation({
		mutationFn: deleteCategoryAPI,
	});

	return { categorysQuery, createCategory, deleteCategory };
};

export const useCategoryItemList = (name) => {
	const queryClient = useQueryClient();

	const itemListQuery = useQuery({
		queryKey: ['categorys', name],
		queryFn: () => getItems(name),
		initialData: () => {
			const result = queryClient.getQueryData(['categorys']).find((v) => v.name === name);
			return result ? result.itemList : undefined;
		},
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	});

	const addItem = useMutation({
		mutationFn: (newItem) => addNewItem(newItem),
		onSuccess: (data) => {
			queryClient.setQueryData(['categorys', name], (oldData) => {
				return [...oldData, data];
			});
		},
		onError: (err) => alert(`${err} 잠시 후 다시 시도해주세요.`),
	});

	return { itemListQuery, addItem };
};

export const useItemById = (data) => {
	const queryClient = useQueryClient();

	const itemQuery = useQuery({
		queryKey: ['categorys', data.name, data.id],
		queryFn: () => getItem(data),
		initialData: () => {
			const items = queryClient.getQueryData(['categorys', data.name]);
			return items.filter((item) => item.id === data.id);
		},
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	});

	const updateItem = useMutation({
		mutationFn: (data) => updateItemStatus(data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['categorys', data.name, data.id],
			}),
	});

	const deleteItem = useMutation({
		mutationFn: (data) => deleteItemAPI(data),
		onMutate: async (variables) => {
			await queryClient.cancelQueries({
				queryKey: ['categorys', variables.name],
			});
			const oldData = queryClient.getQueryData(['categorys', variables.name]);
			queryClient.setQueryData(['categorys', variables.name], () => oldData.filter((v) => v.id !== variables.id));
			return { oldData };
		},
		onError: (err, newData, context) => {
			queryClient.setQueryData(['categorys', newData.name], {
				...context.oldData,
			});
		},
	});

	return { itemQuery, updateItem, deleteItem };
};
