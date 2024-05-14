import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		const cookies = document.cookie.split(';');

		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
		}
		navigate('/login');
		dispatch({ type: 'LOGOUT' });
	};

	return { logout };
};
