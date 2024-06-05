import { React, useEffect, useState } from 'react';
import { createMeal, deleteMeal, getMeals, updateMeal } from '../services/mealService';

import HeaderContent from '../components/HeaderContent/HeaderContent';
import { getIngredients } from '../services/ingredientService';

const MealsPage = () => {
	const [mealToEdit, setMealToEdit] = useState(null);
	const [meals, setMeals] = useState([]);
	const [mealDeleteId, setMealDeleteId] = useState('');
	const [filteredMeals, setFilteredMeals] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [name, setName] = useState('');
	const [ingredientsList, setIngredientsList] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [price, setPrice] = useState(0);
	const [check, setCheck] = useState(false);
	const [cancel, setCancel] = useState(false);
	const [errorModal, setErrorModal] = useState('');
	const [firstPrice, setFirstPrice] = useState(0);
	const [discount, setDiscount] = useState(0);

	const fetchMeals = async () => {
		try {
			const data = await getMeals();
			setMeals(data);
			setFilteredMeals(data);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchIngredients = async () => {
		try {
			const response = await getIngredients();
			setIngredientsList(response.data);
			setIngredients(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchMeals();
		fetchIngredients();
	}, []);

	useEffect(() => {
		setFilteredMeals(
			meals.filter((meal) => {
				return meal.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
			})
		);
	}, [searchQuery]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const ingredientRows = document.getElementsByClassName('ingredientRow');
		const ingredients = [];

		for (let i = 0; i < ingredientRows.length; i++) {
			const row = ingredientRows[i];
			const ingredientSelect = row.querySelector('select');
			const amountInput = row.querySelector('input[type="number"]');
			const unitTextField = row.querySelector('input[type="text"]');

			if (ingredientSelect && amountInput && unitTextField) {
				const selectedIngredientId = ingredientSelect.value;
				const amount = amountInput.value;
				const unitId = unitTextField.dataset.unitId; // Get the unit's _id from the data attribute

				if (selectedIngredientId && amount && unitId) {
					const selectedIngredient = ingredientsList.find((ingredient) => ingredient._id === selectedIngredientId);

					const ingredient = {
						ingredient: selectedIngredient,
						amount,
						unit: unitId, // Use the unit's _id instead of the name
					};
					ingredients.push(ingredient);
				}
			}
		}

		const meal = { name, ingredients, firstPrice, price };
		console.log(meal);
		resetState();
		try {
			const res = await createMeal(meal);
			if (res.status === 200) resetState();
			if (res.response.data.error) {
				setErrorModal(res.response.data.error);
				window.$('#error-modal').modal();
			}
		} catch (error) {
			console.error(error);
		}
		fetchMeals();
	};

	const handleSave = async (e) => {
		e.preventDefault();

		const ingredientRows = document.getElementsByClassName('ingredientRow');
		const ingredients = [];

		for (let i = 0; i < ingredientRows.length; i++) {
			const row = ingredientRows[i];
			const ingredientSelect = row.querySelector('select');
			const amountInput = row.querySelector('input[type="number"]');
			const unitTextField = row.querySelector('input[type="text"]');

			if (ingredientSelect && amountInput && unitTextField) {
				const selectedIngredientId = ingredientSelect.value;
				const amount = amountInput.value;
				const unitId = unitTextField.dataset.unitId; // Get the unit's _id from the data attribute

				if (selectedIngredientId && amount && unitId) {
					const selectedIngredient = ingredientsList.find((ingredient) => ingredient._id === selectedIngredientId);

					const ingredient = {
						ingredient: selectedIngredient,
						amount,
						unit: unitId, // Use the unit's _id instead of the name
					};
					ingredients.push(ingredient);
				}
			}
		}

		const meal = { name, ingredients, firstPrice, price };
		console.log(meal);
		resetState();
		try {
			const res = await updateMeal(mealToEdit._id, meal);
			if (res.status === 200) resetState();
			if (res.response.data.error) {
				setErrorModal(res.response.data.error);
				window.$('#error-modal').modal();
			}
		} catch (error) {
			console.error(error);
		}
		fetchMeals();

		setMealToEdit(null);
		setCheck(false);
		resetState();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setMealToEdit(null);
		resetState();
		setIngredientsList(ingredients);
		setCheck(false);
		setCancel(false);
	};

	const resetState = () => {
		setName('');
		setPrice(0);
		setFirstPrice(0);
		setDiscount(0);
		const ingredientContainer = document.getElementById('ingredientContainer');
		const ingredientRows = ingredientContainer.getElementsByClassName('ingredientRow');
		while (ingredientRows.length > 0) {
			ingredientContainer.removeChild(ingredientRows[0]);
		}
	};

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	// const handleEdit = (event, mealId) => {
	// 	const mealToEdit = meals.find((meal) => meal._id === mealId);

	// 	setMealToEdit(mealToEdit);
	// 	setName(mealToEdit.name);
	// 	setIngredientsList(mealToEdit.ingredients);
	// 	setPrice(mealToEdit.price);
	// 	setCheck(true);
	// };

	const handleEdit = (event, mealId) => {
		const mealToEdit = meals.find((meal) => meal._id === mealId);
		console.log(mealToEdit);
		setMealToEdit(mealToEdit);
		setName(mealToEdit.name);
		setPrice(mealToEdit.price);
		setFirstPrice(mealToEdit.firstPrice);
		// setDiscount(mealToE);

		// Clear the existing ingredient rows
		const ingredientContainer = document.getElementById('ingredientContainer');
		const ingredientRows = ingredientContainer.getElementsByClassName('ingredientRow');
		while (ingredientRows.length > 0) {
			ingredientContainer.removeChild(ingredientRows[0]);
		}

		// Add ingredient rows based on mealToEdit.ingredients
		mealToEdit.ingredients.forEach((ingredient) => {
			addIngredientRowEdit(ingredient.ingredient, ingredient.amount, ingredient.unit);
		});

		setCheck(true);
	};

	const handleDelete = async (event, mealId) => {
		console.log(mealId);

		try {
			const res = await deleteMeal(mealId);
			await fetchMeals();
		} catch (error) {
			console.log(error);
		}
	};

	const addIngredientRow = () => {
		const ingredientContainer = document.getElementById('ingredientContainer');

		// Create a new div to hold the new fields
		const newIngredientRow = document.createElement('div');
		newIngredientRow.className = 'ingredientRow d-flex align-items-center mb-2';

		// Create a new select element for ingredients
		const newIngredientSelect = document.createElement('select');
		newIngredientSelect.className = 'form-control mr-2';

		// Add a default option
		const defaultOption = document.createElement('option');
		defaultOption.value = '';
		defaultOption.text = '----';
		newIngredientSelect.add(defaultOption);

		// Populate the new select element with options from the ingredientsList
		ingredientsList.forEach((ingredient) => {
			const option = document.createElement('option');
			option.value = ingredient._id;
			option.text = ingredient.name;
			newIngredientSelect.add(option);
		});

		// Create an input field for the amount
		const amountInput = document.createElement('input');
		amountInput.type = 'number';
		amountInput.className = 'form-control mr-2';
		amountInput.placeholder = 'Số lượng';

		// Create a text field for the unit
		const unitTextField = document.createElement('input');
		unitTextField.type = 'text';
		unitTextField.className = 'form-control mr-2';
		unitTextField.placeholder = 'Đơn vị';
		unitTextField.readOnly = true; // Make the text field read-only

		// Add an event listener to the ingredient select
		newIngredientSelect.addEventListener('change', () => {
			const selectedIngredientId = newIngredientSelect.value;
			const selectedIngredient = ingredientsList.find((ingredient) => ingredient._id === selectedIngredientId);

			if (selectedIngredient) {
				unitTextField.value = selectedIngredient.unit.name;
				unitTextField.dataset.unitId = selectedIngredient.unit._id; // Set the unit's _id as a data attribute
			} else {
				unitTextField.value = '';
				delete unitTextField.dataset.unitId; // Remove the data attribute
			}
		});

		// Create a delete button
		const deleteButton = document.createElement('button');
		deleteButton.className = 'btn btn-danger';
		deleteButton.textContent = 'Xoá';
		deleteButton.onclick = () => {
			ingredientContainer.removeChild(newIngredientRow);
		};

		// Append the fields and delete button to the new div
		newIngredientRow.appendChild(newIngredientSelect);
		newIngredientRow.appendChild(amountInput);
		newIngredientRow.appendChild(unitTextField);
		newIngredientRow.appendChild(deleteButton);

		// Append the new div to the ingredientContainer
		ingredientContainer.appendChild(newIngredientRow);
	};

	const addIngredientRowEdit = (selectedIngredient, amount, unit) => {
		const ingredientContainer = document.getElementById('ingredientContainer');

		// Create a new div to hold the new fields
		const newIngredientRow = document.createElement('div');
		newIngredientRow.className = 'ingredientRow d-flex align-items-center mb-2';

		// Create a new select element for ingredients
		const newIngredientSelect = document.createElement('select');
		newIngredientSelect.className = 'form-control mr-2';

		// Populate the new select element with options from the ingredientsList
		ingredientsList.forEach((ingredient) => {
			const option = document.createElement('option');
			option.value = ingredient._id;
			option.text = ingredient.name;
			option.selected = selectedIngredient?._id === ingredient._id; // Select the option if it matches the selected ingredient
			newIngredientSelect.add(option);
		});

		// Create an input field for the amount
		const amountInput = document.createElement('input');
		amountInput.type = 'number';
		amountInput.className = 'form-control mr-2';
		amountInput.placeholder = 'Số lượng';
		amountInput.value = amount; // Set the value to the amount

		// Create a text field for the unit
		const unitTextField = document.createElement('input');
		unitTextField.type = 'text';
		unitTextField.className = 'form-control mr-2';
		unitTextField.placeholder = 'Đơn vị';
		unitTextField.readOnly = true; // Make the text field read-only
		unitTextField.value = unit.name; // Set the value to the unit name
		unitTextField.dataset.unitId = unit._id; // Set the unit's _id as a data attribute

		// Add an event listener to the ingredient select
		newIngredientSelect.addEventListener('change', () => {
			const selectedIngredientId = newIngredientSelect.value;
			const selectedIngredient = ingredientsList.find((ingredient) => ingredient._id === selectedIngredientId);

			if (selectedIngredient) {
				unitTextField.value = selectedIngredient.unit.name;
				unitTextField.dataset.unitId = selectedIngredient.unit._id; // Set the unit's _id as a data attribute
			} else {
				unitTextField.value = '';
				delete unitTextField.dataset.unitId; // Remove the data attribute
			}
		});

		// Create a delete button
		const deleteButton = document.createElement('button');
		deleteButton.className = 'btn btn-danger';
		deleteButton.textContent = 'Xoá';
		deleteButton.onclick = () => {
			ingredientContainer.removeChild(newIngredientRow);
		};

		// Append the fields and delete button to the new div
		newIngredientRow.appendChild(newIngredientSelect);
		newIngredientRow.appendChild(amountInput);
		newIngredientRow.appendChild(unitTextField);
		newIngredientRow.appendChild(deleteButton);

		// Append the new div to the ingredientContainer
		ingredientContainer.appendChild(newIngredientRow);
	};

	return (
		<div className="container-fluid">
			<HeaderContent name={'Món ăn'} />
			{/* <MealsForm mealToEdit={mealToEdit} setMealToEdit={setMealToEdit} /> */}
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-5">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm món ăn</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}

								<div className="card-body">
									<div className="form-group">
										<label htmlFor="meal-name">Tên món ăn</label>
										<input
											type="text"
											className="form-control"
											id="meal-name"
											placeholder="Tên nguyên liệu"
											onChange={(e) => {
												setName(e.target.value);
												if (e.target.value.length !== 0) setCancel(true);
												else setCancel(false);
											}}
											value={mealToEdit ? mealToEdit.name : name}
										/>
									</div>
									<div className="form-group" id="ingredientContainer">
										<label htmlFor="meal-amount">Danh sách nguyên liệu</label>
										<div className="ingredientRow row">
											{mealToEdit &&
												mealToEdit.ingredients.map((ingredient, index) => (
													<div className="ingredientRow" key={index}>
														<select
															className="form-control mr-2"
															value={ingredient._id}
															onChange={(e) => {
																const selectedIngredient = ingredientsList.find((ing) => ing._id === e.target.value);
																const newIngredients = [...ingredientsList];
																newIngredients[index].ingredient = selectedIngredient;
																setIngredientsList(newIngredients);
															}}
														>
															{ingredientsList.map((ing) => (
																<option key={ing._id} value={ing._id}>
																	{ing.name}
																</option>
															))}
														</select>
														<input
															type="number"
															className="form-control mr-2"
															value={ingredient.amount}
															onChange={(e) => {
																const newIngredients = [...ingredientsList];
																newIngredients[index].amount = e.target.value;
																setIngredientsList(newIngredients);
															}}
														/>
														<input type="text" className="form-control mr-2" value={ingredient.unit.name} readOnly />
													</div>
												))}
										</div>
									</div>
									<button className="btn" onClick={addIngredientRow} style={{ color: 'blue' }}>
										+ Thêm nguyên liệu
									</button>
									<div className="form-group">
										<label htmlFor="meal-type">Giá gốc</label>
										<input
											type="number"
											className="form-control"
											id="first-price"
											placeholder="Giá"
											onChange={(e) => {
												setFirstPrice(e.target.value);
												setPrice(e.target.value - (discount * e.target.value) / 100);
												if (e.target.value.length !== 0) setCancel(true);
												else setCancel(false);
											}}
											value={firstPrice}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="meal-type">Giảm giá</label>
										<input
											type="number"
											className="form-control"
											id="discount"
											placeholder="Giá"
											onChange={(e) => {
												setDiscount(e.target.value);
												setPrice((firstPrice - (firstPrice * e.target.value) / 100).toFixed(0));
												if (e.target.value.length !== 0) setCancel(true);
												else setCancel(false);
											}}
											value={discount}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="meal-type">Giá</label>
										<input
											type="text"
											className="form-control"
											id="meal-price"
											placeholder="Giá"
											onChange={(e) => {
												setPrice(e.target.value);
												if (e.target.value.length !== 0) setCancel(true);
												else setCancel(false);
											}}
											value={price}
											readOnly
										/>
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
										<>
											<button className="btn btn-primary" onClick={handleSubmit}>
												Submit
											</button>
											{cancel && (
												<button className="btn btn-danger" onClick={handleCancel} style={{ float: 'right' }}>
													cancel
												</button>
											)}
										</>
									)}
									{check && (
										<div>
											<button className="btn btn-danger" onClick={handleCancel} style={{ float: 'right' }}>
												Huỷ
											</button>
											<button className="btn btn-primary" onClick={handleSave}>
												Lưu
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card">
								<div className="card-header">
									<h3 className="card-title">Danh sách món ăn</h3>
									<div className="card-tools">
										<div className="input-group input-group-sm" style={{ width: 150 }}>
											<input
												type="text"
												name="table_search"
												className="form-control float-right"
												placeholder="Search"
												onChange={handleSearch}
											/>
											<div className="input-group-append">
												<button type="submit" className="btn btn-default">
													<i className="fas fa-search" />
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* /.card-header */}
								<div className="card-body table-responsive p-0" style={{ height: 600 }}>
									<table className="table table-hover text-nowrap table-head-fixed">
										<thead>
											<tr>
												<th>Tên</th>
												<th>Giá</th>
												<th>Ngày tạo</th>
												<th>Nguyên liệu</th>
												<th></th>
												<th></th>
											</tr>
										</thead>

										<tbody>
											{filteredMeals.map((meal) => (
												<tr key={meal._id}>
													<td>{meal.name}</td>
													<td>{meal.price.toLocaleString()} đ</td>
													<td>{meal.createdAt}</td>
													<td>
														{meal.ingredients.map((ingredient, index) => (
															<p key={index}>
																- {ingredient.ingredient.name} {ingredient.amount} {ingredient.unit.name}
															</p>
														))}
													</td>

													<td>
														<button
															className="btn btn-block btn-outline-primary"
															onClick={(event) => {
																handleEdit(event, meal._id);
															}}
														>
															Chỉnh sửa
														</button>
													</td>
													<td>
														<button
															type="button"
															className="btn btn-outline-danger"
															data-toggle="modal"
															data-target="#modal-default"
															style={{ float: 'right' }}
															onClick={(e) => setMealDeleteId(meal)}
														>
															Xoá
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="modal fade" id="modal-default">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h4 className="modal-title">Cảnh báo</h4>
												<button type="button" className="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">×</span>
												</button>
											</div>
											<div className="modal-body">
												<p style={{ fontSize: 20 }}>Bạn có chắc chắn muốn xoá {mealDeleteId.name}?</p>
												{/* {mealDeleteId} */}
											</div>
											<div className="modal-footer justify-content-between">
												<button type="button" className="btn btn-danger" data-dismiss="modal">
													huỷ
												</button>
												<button
													type="button"
													className="btn btn-primary"
													onClick={(event) => handleDelete(event, mealDeleteId)}
													data-dismiss="modal"

													// data-toggle="modal"
													// data-target="#error-modal"
												>
													Tiếp tục
												</button>
											</div>
										</div>
										{/* /.modal-content */}
									</div>
								</div>
								<div className="modal fade" id="error-modal">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h4 className="modal-title">Lỗi</h4>
												<button type="button" className="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">×</span>
												</button>
											</div>
											<div className="modal-body" id="error-modal-body">
												{errorModal}
											</div>
											<div className="modal-footer justify-content-between">
												<button type="button" className="btn btn-danger" data-dismiss="modal">
													Đóng
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* /.card-body */}
							</div>
							{/* /.card */}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MealsPage;
