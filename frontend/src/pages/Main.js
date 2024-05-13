import { BrowserRouter, Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Menu from './components/Menu/Menu';
import WorkHeader from './components/WorkHeader/WorkHeader';

/* SCREENS */

const Main = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	return (
		<>
			<WorkHeader />
			<Menu />

			<div className="content-wrapper">
				<Route path="/" element={<Main />} />
                <Route path="/ingredients" element={<IngredientsPage />} />
                <Route path="/meals" element={<MealPage />} />
                <Route path="/units" element={<UnitsPage />} />
                <Route path="/dispatch-note" element={<DispatchNotePage />} />
                <Route path="/purchase-note" element={<PurchaseNotePage />} />
                <Route path="/dispose-note" element={<DisposeNotePage />} />
                <Route path="/types" element={<TypePage />} /><Route>
			</div>
			<Footer />
		</>
	);
};

export default Main;
