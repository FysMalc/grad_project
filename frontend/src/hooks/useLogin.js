import { loginUser } from '../services/userService';
import { useAuthContext } from './useAuthContext';
import { useState } from 'react';

export const useLogin = (username, password) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const { dispatch } = useAuthContext();

	const login = async (username, password) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await loginUser({ username, password });
			console.log(response);
			if (response.status >= 200 && response.status < 300) {
				localStorage.setItem('user', JSON.stringify(response.data));

				dispatch({ type: 'LOGIN', payload: response.data });
				setIsLoading(false);
			} else {
				setIsLoading(false);
				setError('Lỗi');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return { login, isLoading, error };
};
