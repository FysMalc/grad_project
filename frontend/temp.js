import React, { useState } from 'react';

const ButtonDiv = ({ tableId, onClick, children, availableFoods, showTable, ...rest }) => {
	const [orderedFoods, setOrderedFoods] = useState([]);
	const [hasOrders, setHasOrders] = useState(false);

	const handleOrderFood = (food) => {
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
			if (existingFoodIndex !== -1 && prevOrderedFoods[existingFoodIndex].quantity > 1) {
				const updatedFood = {
					...prevOrderedFoods[existingFoodIndex],
					quantity: prevOrderedFoods[existingFoodIndex].quantity - 1,
				};
				const updatedOrderedFoods = [...prevOrderedFoods];
				updatedOrderedFoods[existingFoodIndex] = updatedFood;
				return updatedOrderedFoods;
			}
			return prevOrderedFoods;
		});
	};

	const handleFormSubmit = (event) => {};

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
									{orderedFoods.map((food, index) => {
										return (
											<li key={index}>
												{food.name} x{food.quantity} (Price: ${food.price * food.quantity})
												<button type="button" onClick={() => handleDecrement(food)}>
													-
												</button>
												<button type="button" onClick={() => handleIncrement(food)}>
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
