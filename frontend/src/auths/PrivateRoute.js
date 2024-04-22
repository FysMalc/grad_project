import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import IngredientsPage from '../pages/IngredientsPage';

//private route, only show for authenticated users
const publicRoutes = [
	{
		path: '/ingredients',
		element: <IngredientsPage />,
	},
].map((props) => <Route {...props} />);

export default publicRoutes;
