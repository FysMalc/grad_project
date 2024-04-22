import './style.css';

import React, { useState } from 'react';

const ButtonDiv = ({ tableId, onClick, children, availableFoods, showTable, ...rest }) => {
	const [orderedFoods, setOrderedFoods] = useState([]);
	const [hasOrders, setHasOrders] = useState(false);

	const handleOrderFood = (food) => {
		console.log(food._id);
		setOrderedFoods((prevOrderedFoods) => {
			const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food._id);
			if (existingFoodIndex !== -1) {
				const updatedFood = {
					...prevOrderedFoods[existingFoodIndex],
					quantity: prevOrderedFoods[existingFoodIndex].quantity + 1,
				};
				const updatedOrderedFoods = [...prevOrderedFoods];
				updatedOrderedFoods[existingFoodIndex] = updatedFood;
				return updatedOrderedFoods;
			} else {
				return [...prevOrderedFoods, { id: food._id, name: food.name, quantity: 1, price: food.price }];
			}
		});
		if (hasOrders === false) {
			setHasOrders(true);
		}
	};
	const handleFormSubmit = (event) => {};

	const handleIncrement = (food) => {
		setOrderedFoods((prevOrderedFoods) => {
			const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food.id);
			if (existingFoodIndex !== -1) {
				const updatedFood = {
					...prevOrderedFoods[existingFoodIndex],
					quantity: prevOrderedFoods[existingFoodIndex].quantity + 1,
				};
				const updatedOrderedFoods = [...prevOrderedFoods];
				updatedOrderedFoods[existingFoodIndex] = updatedFood;
				return updatedOrderedFoods;
			}
			return prevOrderedFoods;
		});
	};

	const handleDecrement = (food) => {
		setOrderedFoods((prevOrderedFoods) => {
			const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food.id);
			if (existingFoodIndex !== -1) {
				if (prevOrderedFoods[existingFoodIndex].quantity > 1) {
					const updatedFood = {
						...prevOrderedFoods[existingFoodIndex],
						quantity: prevOrderedFoods[existingFoodIndex].quantity - 1,
					};
					const updatedOrderedFoods = [...prevOrderedFoods];
					updatedOrderedFoods[existingFoodIndex] = updatedFood;
					return updatedOrderedFoods;
				} else {
					const updatedOrderedFoods = prevOrderedFoods.filter((item) => item.id !== food.id);
					if (updatedOrderedFoods.length === 0) setHasOrders(false);
					return updatedOrderedFoods;
				}
			}

			return prevOrderedFoods;
		});
	};

	return (
		<div {...rest}>
			<div className={`button-div ${hasOrders ? 'has-orders' : ''}`} onClick={onClick}>
				{children || `Table ${tableId}`}
			</div>
			<div>
				{showTable && (
					<div className="popup">
						<h2>Table {tableId}</h2>
						<form onSubmit={handleFormSubmit} className="ordered-form">
							<div className="oredered-foods">
								<p className="heading">Ordered Foods</p>
								<ul>
									{orderedFoods.map((item, index) => {
										return (
											<li key={index}>
												{item.name} x{item.quantity} ({(item.price * item.quantity).toLocaleString()} đ)
												<button type="button" onClick={() => handleDecrement(item)}>
													-
												</button>
												<button type="button" onClick={() => handleIncrement(item)}>
													+
												</button>
											</li>
										);
									})}
								</ul>
							</div>

							<button type="submit">Submit</button>
						</form>
						<div className="available-foods">
							<p className="heading">Available Foods</p>
							<ul>
								{availableFoods.map((food, index) => {
									return (
										<li
											key={index}
											onClick={() => {
												handleOrderFood(food);
											}}
										>
											{food.name}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ButtonDiv;
