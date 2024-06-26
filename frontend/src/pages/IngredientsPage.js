import { React, useEffect, useState } from 'react';
import { createIngredient, deleteIngredient, getIngredients, updateIngredient } from '../services/ingredientService';

import HeaderContent from '../components/HeaderContent/HeaderContent';
import IngredientsForm from '../components/Forms/ingredientsForm/IngredientsForm';
import axios from 'axios';
import { getTypes } from '../services/typeService';
import { getUnits } from '../services/unitService';

const IngredientsPage = () => {
	const [ingredientToEdit, setIngredientToEdit] = useState(null);
	const [ingredients, setIngredients] = useState([]);
	const [filteredIngredients, setFilteredIngredients] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [ingredientId, setIngredientId] = useState('');
	const [modalError, setModalError] = useState('');

	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [amount, setAmount] = useState('');
	const [unit, setUnit] = useState('');
	const [units, setUnits] = useState([]);
	const [types, setTypes] = useState([]);
	const [check, setCheck] = useState(false);

	const fetchUnits = async () => {
		try {
			const res = await getUnits();
			setUnits(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchTypes = async () => {
		try {
			const res = await getTypes();
			setTypes(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchIngredients = async () => {
		try {
			const response = await getIngredients();
			setIngredients(response.data);
			setFilteredIngredients(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchUnits();
		fetchTypes();
		fetchIngredients();
	}, []);

	useEffect(() => {
		setFilteredIngredients(
			ingredients.filter((ingredient) => {
				return ingredient.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
			})
		);

		if (ingredientToEdit !== null) {
			setName(ingredientToEdit.name);
			setType(ingredientToEdit.type);
			setAmount(ingredientToEdit.amount);
			setUnit(ingredientToEdit.unit);
			setCheck(true);
		}
	}, [searchQuery, ingredientToEdit]);

	const resetState = () => {
		setName('');
		setAmount('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const ingredient = { name, type, amount, unit };
		console.log(ingredient);

		try {
			const res = await createIngredient(ingredient);
			if (res.status === 200) resetState();
			console.log(res.response.data.error);
			if (res.response.data.error == 'Nguyên liệu đã tồn tại.') {
				setModalError('Nguyên liệu đã tồn tại.');
				window.$('#error-modal').modal('show');
			}
		} catch (error) {
			console.error(error);
		}
		fetchIngredients();
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
		fetchIngredients();
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setIngredientToEdit(null);
		resetState();
		setCheck(false);
	};

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleEdit = (event, ingredientId) => {
		const ingredientToEdit = ingredients.find((ingredient) => ingredient._id === ingredientId);
		setIngredientToEdit(ingredientToEdit);
	};

	const handleDelete = async (event, ingredientId) => {
		const res = await deleteIngredient(ingredientId);
		console.log('Đây là res', res);
		await fetchIngredients();

		if (res.response.data.error === 'Nguyên liệu đang được sử dụng') {
			setModalError('Nguyên liệu đang được sử dụng');
			window.$('#error-modal').modal('show');
		}
	};
	return (
		<div className="container-fluid ">
			<HeaderContent name={'Nguyên liệu'} />
			{/* <IngredientsForm ingredientToEdit={ingredientToEdit} setIngredientToEdit={setIngredientToEdit} /> */}
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-3">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm nguyên liệu</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}

								<div className="card-body">
									<div className="form-group">
										<label htmlFor="ingredient-name">Tên nguyên liệu</label>
										<input
											type="text"
											className="form-control"
											id="ingredient-name"
											placeholder="Tên nguyên liệu"
											onChange={(e) => setName(e.target.value)}
											value={name}
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
										<label htmlFor="ingredient-type">Loại</label>
										<select
											className="form-control"
											id="ingredient-type"
											onChange={(e) => {
												setType(e.target.value);
												console.log(e.target.value);
											}}
										>
											<option key="null">----</option>
											{types.map((type) => {
												return (
													<option key={type._id} value={type._id}>
														{type.name}
													</option>
												);
											})}
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="ingredient-unit">Đơn vị</label>
										<select
											className="form-control"
											id="ingredient-unit"
											onChange={(e) => {
												setUnit(e.target.value);
												console.log(e.target.value);
											}}
										>
											<option key="null">----</option>
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
											<button className="btn btn-danger" onClick={handleCancel} style={{ float: 'right' }}>
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
						<div className="col-9">
							<div className="card">
								<div className="card-header">
									<h3 className="card-title">Danh sách nguyên liệu</h3>
									<div className="card-tools">
										<div className="input-group input-group-sm" style={{ width: 200 }}>
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
									<table className="table table-hover table-head-fixed text-nowrap">
										<thead>
											<tr>
												<th>Tên</th>
												<th>Loại</th>
												<th>Số lượng</th>
												<th>Đơn vị</th>
												<th>Ngày tạo</th>
												<th></th>
												<th></th>
											</tr>
										</thead>

										<tbody>
											{filteredIngredients.map((ingredient) => (
												<tr key={ingredient._id}>
													<td>{ingredient.name}</td>
													<td>{ingredient.type.name}</td>
													<td>{ingredient.amount}</td>
													<td>{ingredient.unit.name}</td>
													<td>{ingredient.createdAt}</td>
													<td>
														<button
															className="btn  btn-outline-primary"
															style={{ float: 'right' }}
															onClick={(event) => {
																handleEdit(event, ingredient._id);
															}}
														>
															Chỉnh sửa
														</button>
													</td>
													<td>
														{/* <button
													className="btn btn-block btn-outline-danger"
													onClick={(event) => {
														handleDelete(event, ingredient._id);
													}}
												>
													Xoá
												</button> */}
														<div className="modal fade" id="modal-default">
															<div className="modal-dialog">
																<div className="modal-content">
																	<div className="modal-header">
																		<h4 className="modal-title">Bạn có chắc chắn muốn xoá ?</h4>
																		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
																			<span aria-hidden="true">×</span>
																		</button>
																	</div>
																	<div className="modal-body">
																		<p>Bạn có muốn xoá nguyên liệu này?</p>
																		{/* {ingredientId} */}
																	</div>
																	<div className="modal-footer justify-content-between">
																		<button type="button" className="btn btn-danger" data-dismiss="modal">
																			huỷ
																		</button>
																		<button
																			type="button"
																			className="btn btn-primary"
																			onClick={(event) => handleDelete(event, ingredientId)}
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

														{/* /.modal-dialog */}

														<button
															type="button"
															className="btn btn-outline-danger"
															data-toggle="modal"
															data-target="#modal-default"
															style={{ float: 'right' }}
															onClick={(e) => setIngredientId(ingredient._id)}
														>
															Xoá
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
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
													{modalError}
												</div>
												<div className="modal-footer justify-content-between">
													<button type="button" className="btn btn-danger" data-dismiss="modal">
														Close
													</button>
												</div>
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
			{/* table */}
		</div>
	);
};

export default IngredientsPage;
