import { React, useEffect, useState } from 'react';
import { createPurchaseNote, getPurchaseNotes } from '../services/purchaseNoteService';

import HeaderContent from '../components/HeaderContent/HeaderContent';
import { getIngredients } from '../services/ingredientService';

const PurchaseNotePage = () => {
	const [purchaseNotes, setPurchaseNotes] = useState([]);
	const [creator, setCreator] = useState('');
	const [receiver, setReceiver] = useState('');
	const [note, setNote] = useState('');
	const [ingredientsList, setIngredientsList] = useState([]);
	const [selectedRowData, setSelectedRowData] = useState(null);
	const [cancel, setCancel] = useState(false);

	const fetchIngredients = async () => {
		try {
			const response = await getIngredients();
			setIngredientsList(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchPurchaseNotes = async () => {
		try {
			const data = await getPurchaseNotes();
			setPurchaseNotes(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPurchaseNotes();
		fetchIngredients();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const ingredientRows = document.getElementsByClassName('ingredientRow');
		const purchase_list = [];

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
					purchase_list.push(ingredient);
				}
			}
		}

		const purchaseNote = { creator, receiver, purchase_list, note };
		console.log(purchaseNote);

		try {
			const res = await createPurchaseNote(purchaseNote);
			if (res.status === 200) resetState();
		} catch (error) {
			console.error(error);
		}
		fetchPurchaseNotes();
		resetState();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		resetState();
		setCancel(!cancel);
	};

	const resetState = () => {
		document.getElementById('creator-name').value = '';
		document.getElementById('receiver-name').value = '';
		document.getElementById('note').value = '';
		const ingredientContainer = document.getElementById('ingredientContainer');
		const ingredientRows = ingredientContainer.getElementsByClassName('ingredientRow');
		while (ingredientRows.length > 0) {
			ingredientContainer.removeChild(ingredientRows[0]);
		}
		setCreator('');
		setNote('');
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

	return (
		<>
			<HeaderContent name={'Phiếu Nhập'} />
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm phiếu nhập</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}

								<div className="card-body">
									<div className="form-group">
										<label htmlFor="creator-name">Người lập phiếu</label>
										<input
											type="text"
											className="form-control"
											id="creator-name"
											placeholder="Tên người lập"
											onChange={(e) => {
												setCreator(e.target.value);
												if (e.target.value.length !== 0) setCancel(true);
												else setCancel(false);
											}}
										/>
									</div>
									<div className="form-group">
										<label htmlFor="receiver-name">Người nhận</label>
										<input
											type="text"
											className="form-control"
											id="receiver-name"
											placeholder="Tên người nhận"
											onChange={(e) => {
												setReceiver(e.target.value);
												if (e.target.value.length !== 0) setCancel(true);
												else setCancel(false);
											}}
										/>
									</div>
									<div className="form-group" id="ingredientContainer">
										<label htmlFor="ingredient-list">Danh sách nguyên liệu</label>
										<div className="ingredientRow row"></div>
									</div>
									<button className="btn" onClick={addIngredientRow} style={{ color: 'blue' }}>
										+ Thêm nguyên liệu
									</button>
									<div className="form-group">
										<label htmlFor="meal-type">Ghi chú</label>
										<input
											type="text"
											className="form-control"
											id="note"
											placeholder="Ghi chú"
											onChange={(e) => {
												setNote(e.target.value);
												if (e.target.value.length !== 0) setCancel(true);
												else setCancel(false);
											}}
										/>
									</div>
								</div>
								{/* /.card-body */}
								<div className="card-footer">
									<button className="btn btn-primary" onClick={handleSubmit}>
										Submit
									</button>
									{cancel && (
										<button className="btn btn-danger" onClick={handleCancel} style={{ float: 'right' }}>
											cancel
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="content">
				<div className="container-fluid">
					<div className=" col-12">
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Danh sách phiếu nhập</h3>
							</div>
							{/* ./card-header */}
							<div className="card-body">
								<div className="dataTables_wrapper">
									<table id="dispatch" className="table table-bordered table-hover ">
										<thead>
											<tr>
												<th>Người lập</th>
												<th>Người nhận</th>
												<th>Thời gian tạo</th>
												<th>Ghi chú</th>
											</tr>
										</thead>
										<tbody>
											{purchaseNotes.map((note) => (
												<tr
													key={note._id}
													data-toggle="modal"
													data-target="#modal-default"
													onClick={(e) => setSelectedRowData(note)}
												>
													<td>{note.creator}</td>
													<td>{note.receiver}</td>
													<td>{note.createdAt}</td>
													<td>{note.note}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<div class="modal fade" id="modal-default">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title">Danh sách đồ nhập</h4>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">×</span>
											</button>
										</div>
										<div className="modal-body">
											{selectedRowData &&
												selectedRowData.dispatch_list.map((item) => (
													<div key={item._id}>
														<p>
															{item.ingredient.name} - {item.amount} {item.unit.name}
														</p>
													</div>
												))}
										</div>
										<div className="modal-footer justify-content-between">
											<button type="button" className="btn btn-danger" data-dismiss="modal">
												Đóng
											</button>
										</div>
									</div>
									{/* /.modal-content */}
								</div>
							</div>
							{/* /.card-body */}
						</div>
						{/* /.card */}
					</div>
				</div>
			</section>
		</>
	);
};

export default PurchaseNotePage;
