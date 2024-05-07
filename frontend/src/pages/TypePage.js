import { React, useEffect, useState } from 'react';
import { createType, deleteType, getTypes } from '../services/typeService';

import HeaderContent from '../components/HeaderContent/HeaderContent';

// import TypesForm from '../components/Forms/typesForm/TypesForm';

const TypesPage = () => {
	const [typeToEdit, setTypeToEdit] = useState(null);
	const [types, setTypes] = useState([]);
	const [filteredTypes, setFilteredTypes] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [name, setName] = useState('');
	const [check, setCheck] = useState(false);

	const fetchTypes = async () => {
		try {
			const response = await getTypes();
			setTypes(response.data);
			setFilteredTypes(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchTypes();
	}, []);

	useEffect(() => {
		setFilteredTypes(
			types.filter((type) => {
				return type.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
			})
		);
	}, [searchQuery]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const type = { name };
		console.log(type);

		try {
			const res = await createType(type);
			if (res.status === 200) resetState();
		} catch (error) {
			console.error(error);
		}
		fetchTypes();
	};

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleEdit = (event, typeId) => {
		const typeToEdit = types.find((type) => type._id === typeId);
		setTypeToEdit(typeToEdit);
	};

	const handleDelete = async (event, typeId) => {
		try {
			const res = await deleteType(typeId);
			await fetchTypes();
		} catch (error) {
			console.log(error);
		}
	};

	const resetState = () => {
		setName('');
	};
	return (
		<div className="container-fluid">
			<HeaderContent name={'Loại'} />

			<section className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Thêm loại</h3>
								</div>
								{/* /.card-header */}
								{/* form start */}

								<div className="card-body">
									<div className="form-group">
										<label htmlFor="type-name">Tên loại</label>
										<input
											type="text"
											className="form-control"
											id="type-name"
											placeholder="Tên loại"
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
			{/* <TypesForm typeToEdit={typeToEdit} setTypeToEdit={setTypeToEdit} /> */}
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-header">
							<h3 className="card-title">Danh sách loại nguyên liệu</h3>
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
									{filteredTypes.map((type) => (
										<tr key={type._id}>
											<td>{type.name}</td>
											{/* <td>{type.createdAt}</td> */}
											<td>
												<button
													className="btn btn-block btn-outline-primary"
													onClick={(event) => {
														handleEdit(event, type._id);
													}}
												>
													Chỉnh sửa
												</button>
											</td>
											<td>
												{/* <button
													className="btn btn-block btn-outline-danger"
													onClick={(event) => {
														// handleDelete(event, type._id);
														handleShow();
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
																<p>Bạn có muốn xoá loại nguyên liệu này?</p>
															</div>
															<div className="modal-footer justify-content-between">
																<button type="button" className="btn btn-danger" data-dismiss="modal">
																	huỷ
																</button>
																<button
																	type="button"
																	className="btn  btn-primary"
																	onClick={(event) => handleDelete(event, type._id)}
																	data-dismiss="modal"
																	data-toggle="modal"
																	data-target="#error-modal"
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
											Loại nguyên liệu đang được sử dụng
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

export default TypesPage;
