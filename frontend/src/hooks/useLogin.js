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
		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getTime() * 8 * 60 * 60 * 1000);
		try {
			const response = await loginUser({ username, password });
			console.log('Đây là response', response);

			document.cookie = `refresh_token = ${response.data.refresh_token}; max-age = 3600; path = / ;value = ${response.data.resfresh_token}`;
			if (response.status >= 200 && response.status < 300) {
				localStorage.setItem('user', JSON.stringify(response.data));
				localStorage.setItem('isAdmin', response.data.admin);

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
