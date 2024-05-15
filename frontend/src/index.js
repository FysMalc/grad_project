import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TableContextProvider } from './context/TableContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthContextProvider>
		<TableContextProvider>
			<App />
		</TableContextProvider>
	</AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
