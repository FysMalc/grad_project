import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...action.payload };
		case 'LOGOUT':
			return { user: null, refresh_token: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		refresh_token: null,
		user: null,
		isAdmin: null,
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);

	console.log('AuthContext state: ', state);

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
