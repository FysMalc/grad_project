import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AdminRoute from '../auths/AdminRoute';
import DispatchNotePage from '../pages/DispatchNotePage';
import DisposeNotePage from '../pages/DisposeNotePage';
import Footer from './Footer/Footer';
import IngredientsPage from '../pages/IngredientsPage';
import MealPage from '../pages/MealPages';
import Menu from './Menu/Menu';
import PrivateRoute from '../auths/ProtectedRoute';
import ProtectedRoute from '../auths/ProtectedRoute';
import PurchaseNotePage from '../pages/PurchaseNotePage';
import React from 'react';
import TypePage from '../pages/TypePage';
import UnitsPage from '../pages/UnitPage';
import WorkHeader from './WorkHeader/WorkHeader';

const Main = () => {
	return (
		<>
			<WorkHeader />
			<Menu />
			<div className="content-wrapper">
				<Routes>
					<Route path="ingredients" element={<IngredientsPage />} />
					<Route path="meals" element={<MealPage />} />
					<Route path="units" element={<UnitsPage />} />
					<Route path="types" element={<TypePage />} />
					<Route path="purchase-note" element={<PurchaseNotePage />} />
					<Route path="dispose-note" element={<DisposeNotePage />} />
					<Route path="dispatch-note" element={<DispatchNotePage />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
};

export default Main;
