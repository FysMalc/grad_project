import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import DispatchNotePage from './pages/DispatchNotePage';
import DisposeNotePage from './pages/DisposeNotePage';
import Footer from './components/Footer/Footer';
import IngredientsPage from './pages/IngredientsPage';
import Main from './components/Main';
import MealPage from './pages/MealPages';
import Menu from './components/Menu/Menu';
import Navbar from './components/NavBar/Navbar';
import PurchaseNotePage from './pages/PurchaseNotePage';
import TablePage from './pages/tablePage/tablePage';
import TestPage from './pages/TestPage';
import TypePage from './pages/TypePage';
import UnitsPage from './pages/UnitPage';
import WorkHeader from './components/WorkHeader/WorkHeader';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<WorkHeader />
				<Menu />
				<div className="content-wrapper">
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/ingredients" element={<IngredientsPage />} />
						<Route path="/meals" element={<MealPage />} />
						<Route path="/units" element={<UnitsPage />} />
						<Route path="/dispatch-note" element={<DispatchNotePage />} />
						<Route path="/purchase-note" element={<PurchaseNotePage />} />
						<Route path="/dispose-note" element={<DisposeNotePage />} />
						<Route path="/types" element={<TypePage />} />

						{/* <Route path="/test" element={<TestPage />} /> */}
					</Routes>
				</div>
			</BrowserRouter>
			<Footer />
		</div>
	);
};

export default App;
