import { Navigate, Route } from 'react-router-dom';
import React, { Component } from 'react';

import { isAuthenticated } from './index';

//private route, only show for authenticated users
const ProtectedRoute = ({ children }) => {
	const auth = isAuthenticated();

	if (!auth) {
		// If the user is not logged in, redirect to the login page
		return <Navigate to="/login" replace />;
	}

	// If the user is logged in, render the desired component
	return children;
};

export default ProtectedRoute;
