import { useEffect } from 'react';

const ClearLocalStorage = () => {
	useEffect(() => {
		// Listen for the beforeunload event
		const handleBeforeUnload = (event) => {
			// Check if there is any data in localStorage
			const hasLocalStorageData = Object.keys(localStorage).length > 0;

			if (hasLocalStorageData) {
				// Display a confirmation dialog or notification
				event.preventDefault();
				event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return null; // This component doesn't render any UI
};

export default ClearLocalStorage;
