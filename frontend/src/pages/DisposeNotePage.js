import 'react-datepicker/dist/react-datepicker.css';

import { React, useEffect, useState } from 'react';
import { createDisposeNote, getDisposeNotes } from '../services/disposeNoteService';

import DatePicker from 'react-datepicker';
import HeaderContent from '../components/HeaderContent/HeaderContent';
import { convertTimestamp } from '../utils/convertTz';
import { getIngredients } from '../services/ingredientService';

const DisposeNotePage = () => {
	const [disposeNotes, setDisposeNotes] = useState([]);
	const [creator, setCreator] = useState('');
	const [note, setNote] = useState('');
	const [ingredientsList, setIngredientsList] = useState([]);
	const [selectedRowData, setSelectedRowData] = useState(null);
	const [cancel, setCancel] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [filteredDisposeNotes, setFilteredDisposeNotes] = useState([]);

	const fetchIngredients = async () => {
		try {
			const response = await getIngredients();
			setIngredientsList(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchDisposeNotes = async () => {
		try {
			const data = await getDisposeNotes();
			setDisposeNotes(data);
			setFilteredDisposeNotes(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchIngredients();
		fetchDisposeNotes();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const ingredientRows = document.getElementsByClassName('ingredientRow');
		const dispose_list = [];

		for (let i = 0; i < ingredientRows.length; i++) {
			const row = ingredientRows[i];
			const ingredientSelect = row.querySelector('select');
			const amountInput = row.querySelector('input[type="number"]');
			const unitTextField = row.querySelector('input[type="text"]');

			if (ingredientSelect && amountInput && unitTextField) {
				const selectedIngredientId = ingredientSelect.value;
				const amount = parseFloat(amountInput.value);
				const unitName = unitTextField.value;
				const unitId = unitTextField.dataset.unitId; // Get the unit's _id from the data attribute

				if (selectedIngredientId && amount && unitId) {
					const selectedIngredient = ingredientsList.find((ingredient) => ingredient._id === selectedIngredientId);

					const ingredient = {
						id: selectedIngredient._id,
						ingredientName: selectedIngredient.name,
						amount,
						unit: unitName, // Use the unit's _id instead of the name
					};
					dispose_list.push(ingredient);
				}
			}
		}

		const disposeNote = { creator, dispose_list, note };
		console.log(disposeNote);

		try {
			const res = await createDisposeNote(disposeNote);
			if (res.status === 200) resetState();
		} catch (error) {
			console.error(error);
		}
		fetchDisposeNotes();
		resetState();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		resetState();
		setCancel(!cancel);
	};

	const resetState = () => {
		document.getElementById('creator-name').value = '';
		document.getElementById('note').value = '';
		const ingredientContainer = document.getElementById('ingredientContainer');
		const ingredientRows = ingredientContainer.getElementsByClassName('ingredientRow');
		while (ingredientRows.length > 0) {
			ingredientContainer.removeChild(ingredientRows[0]);
		}
		setCreator('');
		setNote('');
	};

	const filter = (date) => {
		setStartDate(date);
		if (!date) {
			setFilteredDisposeNotes(disposeNotes);
		} else {
			const filteredDisposeNotesByDate = disposeNotes.filter((disposenote) => {
				const disposeNoteDate = new Date(disposenote.createdAt);
				return (
					disposeNoteDate.getDate() === date.getDate() &&
					disposeNoteDate.getMonth() === date.getMonth() &&
					disposeNoteDate.getFullYear() === date.getFullYear()
				);
			});
			setFilteredDisposeNotes(filteredDisposeNotesByDate);
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

	return (
		<>
			<HeaderContent name={'Phiếu thanh lý'} />
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm phiếu thanh lý</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}

								<div className="card-body">
									<div className="form-group">
										<label htmlFor="meal-name">Người lập phiếu</label>
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
						<div className="col-md-6">
							<DatePicker selected={startDate} onChange={(date) => filter(date)} />
						</div>
					</div>
				</div>
			</section>
			<section className="content">
				<div className="container-fluid">
					<div className=" col-12">
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Danh sách phiếu thanh lý</h3>
							</div>
							{/* ./card-header */}
							<div className="card-body">
								<div className="dataTables_wrapper">
									<table id="dispose" className="table table-bordered table-hover ">
										<thead>
											<tr>
												<th>Người lập</th>
												<th>Thời gian tạo</th>
												<th>Ghi chú</th>
											</tr>
										</thead>
										<tbody>
											{filteredDisposeNotes.map((note) => (
												<tr
													key={note._id}
													data-toggle="modal"
													data-target="#modal-default"
													onClick={(e) => setSelectedRowData(note)}
												>
													<td>{note.creator}</td>
													<td>{convertTimestamp(note.createdAt)}</td>
													<td>{note.note}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<div className="modal fade" id="modal-default">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title">Danh sách đồ thanh lý</h4>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">×</span>
											</button>
										</div>
										<div className="modal-body">
											<table className="table table-bordered table-hover ">
												<thead>
													<tr>
														<th>Tên nguyên liệu</th>
														<th>Số lượng</th>
														<th>Đơn vị</th>
													</tr>
												</thead>
												<tbody>
													{selectedRowData &&
														selectedRowData.dispose_list.map((item) => (
															<tr key={item._id}>
																<td>{item.ingredientName}</td>
																<td>{item.amount}</td>
																<td>{item.unit}</td>
															</tr>
														))}
												</tbody>
											</table>
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

export default DisposeNotePage;
