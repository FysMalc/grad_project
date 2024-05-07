import { React, useEffect, useState } from 'react';
import { deleteType, getTypes } from '../services/typeService';

import HeaderContent from '../components/HeaderContent/HeaderContent';

// import TypesForm from '../components/Forms/typesForm/TypesForm';

const TypesPage = () => {
	const [typeToEdit, setTypeToEdit] = useState(null);
	const [types, setTypes] = useState([]);
	const [filteredTypes, setFilteredTypes] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

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

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleEdit = (event, typeId) => {
		const typeToEdit = types.find((type) => type._id === typeId);
		setTypeToEdit(typeToEdit);
	};

	const handleDelete = async (event, typeId) => {
		const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa nguyên liệu này không?');
		if (confirmDelete) {
			try {
				const res = await deleteType(typeId);
				await fetchTypes();
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className="container-fluid">
			<HeaderContent name={'Nguyên liệu'} />
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
												<button
													className="btn btn-block btn-outline-danger"
													onClick={(event) => {
														handleDelete(event, type._id);
													}}
												>
													Xoá
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
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
