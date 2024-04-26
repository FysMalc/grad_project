import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import DispatchNotePage from './pages/DispatchNotePage';
import DisposeNotePage from './pages/DisposeNotePage';
import Footer from './components/Footer/Footer';
import IngredientsForm from './components/Forms/ingredientsForm/IngredientsForm';
import IngredientsPage from './pages/IngredientsPage';
import Main from './components/Main';
import MealPage from './pages/mealPage';
import Menu from './components/Menu/Menu';
import Navbar from './components/NavBar/Navbar';
import PurchaseNotePage from './pages/PurchaseNotePage';
import TablePage from './pages/tablePage/tablePage';
import TestPage from './pages/TestPage';
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
						<Route path="/dispatch-note" element={<DispatchNotePage />} />
						<Route path="/purchase-note" element={<PurchaseNotePage />} />
						<Route path="/dispose-note" element={<DisposeNotePage />} />
						{/* <Route path="/test" element={<TestPage />} /> */}
					</Routes>
				</div>
			</BrowserRouter>
			<Footer />
		</div>
	);
};

export default App;
