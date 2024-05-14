import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import DispatchNotePage from './pages/DispatchNotePage';
import DisposeNotePage from './pages/DisposeNotePage';
import Footer from './components/Footer/Footer';
import IngredientsPage from './pages/IngredientsPage';
import LoginPage from './pages/LoginPage';
import Main from './components/Main';
import MealPage from './pages/MealPages';
import Menu from './components/Menu/Menu';
import Navbar from './components/NavBar/Navbar';
import ProtectedRoute from './auths/ProtectedRoute';
import PurchaseNotePage from './pages/PurchaseNotePage';
import TablePage from './pages/tablePage/tablePage';
import TestPage from './pages/TestPage';
import TypePage from './pages/TypePage';
import UnitsPage from './pages/UnitPage';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/*" element={<Main />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
