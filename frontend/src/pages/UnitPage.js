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

	const fetchUnits = async () => {
		try {
			const response = await getUnits();
			setUnits(response.data);
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
	};

	const handleEdit = (event, unitId) => {
		const unitToEdit = units.find((unit) => unit._id === unitId);
		setUnitToEdit(unitToEdit);
	};

	const handleDelete = async (event, unitId) => {
		const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa đơn vị này không?');
		if (confirmDelete) {
			try {
				const res = await deleteUnit(unitId);
				await fetchUnits();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const resetState = () => {
		setName('');
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
									{filteredUnits.map((unit) => (
										<tr key={unit._id}>
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
												<button
													className="btn btn-block btn-outline-danger"
													style={{ float: 'right' }}
													onClick={(event) => {
														handleDelete(event, unit._id);
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

export default UnitsPage;
