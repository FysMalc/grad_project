import { Navigate, Route } from 'react-router-dom';

import React from 'react';

// Admin route, only show for authenticated admin users
const AdminRoute = ({ component: Component, ...rest }) => {
	const isAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;

	return (
		<Route
			{...rest}
			render={(props) =>
				isAdmin ? (
					<Component {...props} />
				) : (
					<Navigate
						to={{
							pathname: '/unauthorized',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default AdminRoute;
