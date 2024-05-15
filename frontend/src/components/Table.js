import React, { useEffect, useRef } from 'react';

const Table = ({ tableId, onClick, hasOrders, ...rest }) => {
	// const handleOrderFood = (food) => {
	// 	console.log(food._id);
	// 	setOrderedFoods((prevOrderedFoods) => {
	// 		const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food._id);
	// 		if (existingFoodIndex !== -1) {
	// 			const updatedFood = {
	// 				...prevOrderedFoods[existingFoodIndex],
	// 				quantity: prevOrderedFoods[existingFoodIndex].quantity + 1,
	// 			};
	// 			const updatedOrderedFoods = [...prevOrderedFoods];
	// 			updatedOrderedFoods[existingFoodIndex] = updatedFood;

	// 			return updatedOrderedFoods;
	// 		} else {
	// 			const newOrder = { id: food._id, name: food.name, quantity: 1, price: food.price };

	// 			return [...prevOrderedFoods, newOrder];
	// 		}
	// 	});
	// 	if (hasOrders === false) {
	// 		setHasOrders(true);
	// 	}
	// };

	// const handleFormSubmit = (event) => {
	// 	event.preventDefault();
	// 	// Implement your logic to handle form submission
	// };

	// const handleIncrement = (food) => {
	// 	setOrderedFoods((prevOrderedFoods) => {
	// 		const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food.id);
	// 		if (existingFoodIndex !== -1) {
	// 			const updatedFood = {
	// 				...prevOrderedFoods[existingFoodIndex],
	// 				quantity: prevOrderedFoods[existingFoodIndex].quantity + 1,
	// 			};
	// 			const updatedOrderedFoods = [...prevOrderedFoods];
	// 			updatedOrderedFoods[existingFoodIndex] = updatedFood;
	// 			dispatch({
	// 				type: 'ADD_ORDER',
	// 				payload: { tableNumber: tableId, order: updatedFood },
	// 			});
	// 			return updatedOrderedFoods;
	// 		}
	// 		return prevOrderedFoods;
	// 	});
	// };

	// const handleDecrement = (food) => {
	// 	setOrderedFoods((prevOrderedFoods) => {
	// 		const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food.id);
	// 		if (existingFoodIndex !== -1) {
	// 			if (prevOrderedFoods[existingFoodIndex].quantity > 1) {
	// 				const updatedFood = {
	// 					...prevOrderedFoods[existingFoodIndex],
	// 					quantity: prevOrderedFoods[existingFoodIndex].quantity - 1,
	// 				};
	// 				const updatedOrderedFoods = [...prevOrderedFoods];
	// 				updatedOrderedFoods[existingFoodIndex] = updatedFood;
	// 				dispatch({
	// 					type: 'ADD_ORDER',
	// 					payload: { tableNumber: tableId, order: updatedFood },
	// 				});
	// 				return updatedOrderedFoods;
	// 			} else {
	// 				const updatedOrderedFoods = prevOrderedFoods.filter((item) => item.id !== food.id);
	// 				dispatch({
	// 					type: 'REMOVE_ORDER',
	// 					payload: { tableNumber: tableId, orderId: food.id },
	// 				});
	// 				if (updatedOrderedFoods.length === 0) setHasOrders(false);
	// 				return updatedOrderedFoods;
	// 			}
	// 		}
	// 		return prevOrderedFoods;
	// 	});
	// };

	return (
		<div onClick={onClick} {...rest}>
			<span className={`info-box-icon ${hasOrders ? 'bg-success' : 'bg-info'} `}>
				<i className="fas fa-receipt"></i>
			</span>
			<div className="info-box-content">
				<span className="info-box-text" style={{ fontFamily: 'inherit' }}>
					{`Table ${tableId} ${hasOrders}`}
				</span>
			</div>
		</div>
	);
};

export default Table;
