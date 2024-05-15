import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import ClearLocalStorage from './components/ClearLocalStorage';
import LoginPage from './pages/LoginPage';
import Main from './components/Main';
import ProtectedRoute from './auths/ProtectedRoute';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<ClearLocalStorage />
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/*"
						element={
							<ProtectedRoute>
								<Main />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
