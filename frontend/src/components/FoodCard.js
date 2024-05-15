import React from 'react';

const FoodCard = ({ food, handleOrderFood, handleIncrement, handleDecrement, handleRemove }) => {
	return (
		<div className="food-card">
			<div className="food-info">
				<p className="food-name">{food.name}</p>
				<p className="food-price">${food.price}</p>
			</div>
			{handleOrderFood && (
				<button className="order-food" onClick={handleOrderFood}>
					Order
				</button>
			)}
			{handleIncrement && <button className="increment-food" onClick={handleIncrement}></button>}
			{handleDecrement && <button className="decrement-food" onClick={handleDecrement}></button>}
			{handleRemove && <button className="remove-food" onClick={handleRemove}></button>}
		</div>
	);
};

export default FoodCard;
