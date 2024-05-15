import { TableContext } from '../context/TableContext';
import { useContext } from 'react';

export const useTableContext = () => {
	const context = useContext(TableContext);

	if (!context) {
		throw Error('useTableContext must be used inside an TableContextProvider');
	}

	return context;
};
