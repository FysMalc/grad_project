import { createIngredient, updateIngredient } from '../../../services/ingredientService';
import { useEffect, useState } from 'react';

import HeaderContent from '../../HeaderContent/HeaderContent';
import { getIngredients } from '../../../services/ingredientService';

const IngredientsForm = ({ ingredientToEdit, setIngredientToEdit }) => {
	const [ingredient, setIngredient] = useState(ingredientToEdit || {});

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [amount, setAmount] = useState('');
	const [unit, setUnit] = useState('');
	const [ingredients, setIngredients] = useState([]);

	const [data, setData] = useState({});
	const [check, setCheck] = useState(false);

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const res = await getIngredients();
				setIngredients(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchIngredients();
	}, []);

	useEffect(() => {
		if (ingredientToEdit !== null) {
			setName(ingredientToEdit.name);
			setType(ingredientToEdit.type);
			setAmount(ingredientToEdit.amount);
			setUnit(ingredientToEdit.unit);
			setCheck(true);
		}
	}, [ingredientToEdit]);

	const resetState = () => {
		setName('');
		setType('');
		setAmount('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const ingredient = { name, type, amount, unit };

		try {
			const res = await createIngredient(ingredient);
			if (res.status === 200) resetState();
		} catch (error) {
			console.error(error);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		const ingredient = { name, type, amount, unit };
		try {
			const res = await updateIngredient(ingredientToEdit._id, ingredient);
			if (res.status === 200) resetState();
		} catch (error) {
			console.log(error);
		}

		setIngredientToEdit(null);
		setCheck(false);
		resetState();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setIngredientToEdit(null);
		resetState();
		setCheck(false);
	};

	return (
		<>
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm món ăn</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}

								<div className="card-body">
									<div className="form-group">
										<label htmlFor="ingredient-name">Tên món ăn</label>
										<input
											type="text"
											className="form-control"
											id="ingredient-name"
											placeholder="Tên món ăn"
											onChange={(e) => setName(e.target.value)}
											value={name}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="ingredient-type">Loại</label>
										<input
											type="text"
											className="form-control"
											id="ingredient-type"
											placeholder="Loại"
											onChange={(e) => setType(e.target.value)}
											value={type}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="ingredient-amount">Số lượng</label>
										<input
											type="text"
											className="form-control"
											id="ingredient-amount"
											placeholder="Số lượng"
											onChange={(e) => setAmount(e.target.value)}
											value={amount}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="ingredient-unit">Đơn vị</label>
										<select className="form-control" id="ingredient-unit" onChange={(e) => setUnit(e.target.value)}>
											{units.map((unit) => {
												return (
													<option key={unit._id} value={unit._id}>
														{unit.name}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								{/* /.card-body */}
								<div className="card-footer">
									{/* {check ? (
											<div>
												<button className="btn btn-primary" onClick={handleSave}>
													Save
												</button>
												<button className="btn btn-primary" onClick={handleCancel}>
													Cancel
												</button>
											</div>
										) : (
											<button type="submit" className="btn btn-primary" onClick={handleSubmit}>
												Submit
											</button>
										)} */}

									{!check && (
										<button className="btn btn-primary" onClick={handleSubmit}>
											Submit
										</button>
									)}
									{check && (
										<div>
											<button className="btn btn-primary" onClick={handleCancel} style={{ float: 'right' }}>
												Cancel
											</button>
											<button className="btn btn-primary" onClick={handleSave}>
												Save
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>

		// <form className="create" onSubmit={handleSubmit}>
		// 	<h3>Create a new food item:</h3>
		// 	<label htmlFor=""> Food Name:</label>
		// 	<input className="" type="text" onChange={(e) => setName(e.target.value)} value={name} />

		// 	<label htmlFor="">Amount</label>
		// 	<input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} />

		// 	<label htmlFor="">Type:</label>
		// 	<input type="text" onChange={(e) => setType(e.target.value)} value={type} />

		// 	<label htmlFor="">Unit:</label>
		// 	<input type="text" onChange={(e) => setUnit(e.target.value)} value={unit} />
		// 	<button>Add Food</button>

		// 	{error && <div className="error">{error}</div>}
		// </form>
	);
};

export default IngredientsForm;
