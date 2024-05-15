import { createContext, useEffect, useReducer } from 'react';

export const TableContext = createContext();

export const tableReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ORDER':
			const { tableNumber, order } = action.payload;
			return {
				...action.payload,
			};
		case 'REMOVE_ORDER':
			const { tableNumber: removeTableNumber, orderId } = action.payload;
			const updatedOrders = state.tables[removeTableNumber].orders.filter((order) => order.id !== orderId);
			return {
				...state,
				tables: {
					...state.tables,
					[removeTableNumber]: {
						...state.tables[removeTableNumber],
						orders: updatedOrders,
					},
				},
			};
		case 'UPDATE_NOTE':
			const { tableNumber: updateTableNumber, note } = action.payload;
			return {
				...state,
				tables: {
					...state.tables,
					[updateTableNumber]: {
						...state.tables[updateTableNumber],
						note,
					},
				},
			};
		default:
			return state;
	}
};

export const TableContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(tableReducer, {
		tables: JSON.parse(localStorage.getItem('tables')) || {},
	});

	useEffect(() => {
		localStorage.setItem('tables', JSON.stringify(state.tables));
	}, []);

	console.log('TableContext state: ', state);

	return <TableContext.Provider value={{ ...state, dispatch }}>{children}</TableContext.Provider>;
};
