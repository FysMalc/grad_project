//check if user is authenticated
export const isAuthenticated = () => {
	if (localStorage.getItem('user')) {
		return JSON.parse(localStorage.getItem('user'));
	}
};
