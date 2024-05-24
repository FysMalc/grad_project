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
	const initialState = () => {
		const user = JSON.parse(localStorage.getItem('user'));
		return user ? user : { refresh_token: null, user: null, isAdmin: null };
	};

	const [state, dispatch] = useReducer(authReducer, initialState());

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);

	console.log('AuthContext state: ', state);

	return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
