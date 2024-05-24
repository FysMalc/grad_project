import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import BillPage from '../pages/BillPage';
import DispatchNotePage from '../pages/DispatchNotePage';
import DisposeNotePage from '../pages/DisposeNotePage';
import Footer from './Footer/Footer';
import IngredientsPage from '../pages/IngredientsPage';
import MealPage from '../pages/MealPages';
import Menu from './Menu/Menu';
import PurchaseNotePage from '../pages/PurchaseNotePage';
import React from 'react';
import RevenueBarChart from '../pages/ChartPage';
import TablePage from '../pages/TablePage';
import TypePage from '../pages/TypePage';
import UnitsPage from '../pages/UnitPage';
import UserPage from '../pages/UserPage';
import WorkHeader from './WorkHeader/WorkHeader';

const Main = () => {
	return (
		<>
			<WorkHeader />
			<Menu />
			<div className="content-wrapper">
				<Routes>
					<Route path="tables" element={<TablePage />} />
					<Route path="ingredients" element={<IngredientsPage />} />
					<Route path="meals" element={<MealPage />} />
					<Route path="units" element={<UnitsPage />} />
					<Route path="types" element={<TypePage />} />
					<Route path="purchase-note" element={<PurchaseNotePage />} />
					<Route path="dispose-note" element={<DisposeNotePage />} />
					<Route path="dispatch-note" element={<DispatchNotePage />} />
					<Route path="bill" element={<BillPage />} />
					<Route path="charts" element={<RevenueBarChart />} />
					<Route path="users" element={<UserPage />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
};

export default Main;
