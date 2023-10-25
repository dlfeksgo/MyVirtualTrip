import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';

export const router = createBrowserRouter([
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
]);
