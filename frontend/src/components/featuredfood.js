import { useState, useEffect } from 'react';

function FeaturedFood() {
  
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // API call to get foods
    async function getFoods() {
      const response = await fetch('/api/foods');
      const data = await response.json();
      setFoods(data);
    }
    getFoods();
  }, []);

  return (
    <section className="featured-food">
      <h2>Featured Food</h2>

      <div className="food-list">
        {foods.map(food => (
          <FoodItem 
            key={food.id}
            name={food.name} 
            image={food.image}
            price={food.price}
          />
        ))}
      </div>
    </section>
  );
}

function FoodItem({name, image, price}) {
    return (
      <div className="food-item">
        <img src={image} alt={name} />
  
        <div className="details">
          <h3>{name}</h3>
          <p className="price">${price}</p>
        </div>
      </div>
    );
}

export default FeaturedFood;