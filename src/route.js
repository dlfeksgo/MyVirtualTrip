import { createBrowserRouter } from 'react-router-dom';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Home from './pages/Home';
import List from './pages/List';

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/info',
			element: <Create />,
		},
		{
			path: '/info/edit',
			element: <Edit />,
		},
		{
			path: '/category/:name',
			element: <List />,
		},
	],
	{
		basename: process.env.PUBLIC_URL,
	}
);
