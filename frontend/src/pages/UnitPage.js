import { React, useEffect, useState } from 'react';
import { createUnit, deleteUnit, getUnits } from '../services/unitService';

import HeaderContent from '../components/HeaderContent/HeaderContent';

// import UnitsForm from '../components/Forms/unitsForm/UnitsForm';

const UnitsPage = () => {
	const [unitToEdit, setUnitToEdit] = useState(null);
	const [units, setUnits] = useState([]);
	const [filteredUnits, setFilteredUnits] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [name, setName] = useState('');
	const [check, setCheck] = useState(false);
	const [deleteUnitId, setDeleteUnitId] = useState(null);

	const fetchUnits = async () => {
		try {
			const response = await getUnits();
			setUnits(response.data);
			console.log(units);
			setFilteredUnits(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchUnits();
	}, []);

	useEffect(() => {
		setFilteredUnits(
			units.filter((unit) => {
				return unit.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
			})
		);
	}, [searchQuery]);

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const unit = { name };
		console.log(unit);

		try {
			const res = await createUnit(unit);
			if (res.status === 200) resetState();
		} catch (error) {
			console.error(error);
		}
		fetchUnits();
		console.log(units);
	};

	const handleEdit = (event, unitId) => {
		const unitToEdit = units.find((unit) => unit._id === unitId);
		setUnitToEdit(unitToEdit);
	};

	const handleDelete = async (event, unitId) => {
		try {
			const res = await deleteUnit(unitId);
			await fetchUnits();
		} catch (error) {
			console.log(error);
		}
	};

	const resetState = () => {
		setName('');
	};

	const setDeleteId = (unitId) => {
		setDeleteId(unitId);
	};

	return (
		<div className="container-fluid">
			<HeaderContent name={'Đơn vị'} />
			{/* <UnitsForm unitToEdit={unitToEdit} setUnitToEdit={setUnitToEdit} /> */}
			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm đơn vị</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}

								<div className="card-body">
									<div className="form-group">
										<label htmlFor="unit-name">Tên đơn vị</label>
										<input
											type="text"
											className="form-control"
											id="unit-name"
											placeholder="Tên đơn vị"
											onChange={(e) => setName(e.target.value)}
											value={name}
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
										<button className="btn btn-primary" onClick={handleSubmit}>
											Submit
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-header">
							<h3 className="card-title">Danh sách đơn vị</h3>
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
						<div className="card-body table-responsive p-0">
							<table className="table table-hover text-nowrap">
								<thead>
									<tr>
										<th>Tên</th>
										{/* <th>Ngày tạo</th> */}
									</tr>
								</thead>

								<tbody>
									{filteredUnits.map((unit, index) => (
										<tr key={index}>
											<td>{unit.name}</td>
											{/* <td>{unit.createdAt}</td> */}
											{/* <td>
												<button
													className="btn btn-block btn-outline-primary"
													onClick={(event) => {
														handleEdit(event, unit._id);
													}}
												>
													Chỉnh sửa
												</button>
											</td> */}
											<td>
												{/* <button
													className="btn btn-block btn-outline-danger"
													style={{ float: 'right' }}
													onClick={(event) => {
														handleDelete(event, unit._id);
													}}
												>
													Xoá
												</button> */}
												<div class="modal fade" id="modal-default">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h4 className="modal-title">Bạn có chắc chắn muốn xoá ?</h4>
																<button type="button" className="close" data-dismiss="modal" aria-label="Close">
																	<span aria-hidden="true">×</span>
																</button>
															</div>
															<div className="modal-body">
																<p>Bạn có muốn xoá đơn vị này?</p>
															</div>
															<div className="modal-footer justify-content-between">
																<button type="button" className="btn btn-danger" data-dismiss="modal">
																	huỷ
																</button>
																<button
																	type="button"
																	className="btn  btn-primary"
																	onClick={(event) => handleDelete(event, deleteUnitId)}
																	data-dismiss="modal"
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
													className="btn btn-block btn-outline-danger"
													data-toggle="modal"
													data-target="#modal-default"
													onClick={(event) => setDeleteUnitId(unit._id)}
												>
													Xoá
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div class="modal fade" id="error-modal">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h4 className="modal-title">Lỗi</h4>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">×</span>
											</button>
										</div>
										<div className="modal-body" id="error-modal-body">
											Đơn vị đang được sử dụng
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
	);
};

export default UnitsPage;
