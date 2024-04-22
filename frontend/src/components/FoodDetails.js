const FoodDetails = ({ food }) => {
	return (
		<div className="food_details">
			<h4>{food.title}</h4>
			<p>
				<strong>Amout: </strong>
				{food.amount} {food.unit}
			</p>
			<p>
				<strong>Type: </strong>
				{food.type}
			</p>
			<p>{food.createdAt}</p>
		</div>
	);
};

export default FoodDetails;
