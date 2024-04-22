import { useState } from 'react';

const FoodForm = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const ingredient = { title, type, amount, unit };

        const response = await fetch('/api/ingredient', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredient),

        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('');
            setType('');
            setAmount('');
            setUnit('');
            setError(null);
            console.log("new ingredient added");
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a new food item:</h3>
            <label htmlFor=""> Food Title:</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label htmlFor="">Amount</label>
            <input type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
            />

            <label htmlFor="">Type:</label>
            <input type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
            />
            <button>Add Food</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default FoodForm;