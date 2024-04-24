import { React, useEffect, useState } from 'react';
import { deleteIngredient, getIngredients } from '../services/ingredientService';

import HeaderContent from '../components/HeaderContent/HeaderContent';
import IngredientsForm from '../components/Forms/ingredientsForm/IngredientsForm';

const IngredientsPage = () => {
	const [ingredientToEdit, setIngredientToEdit] = useState(null);
	const [ingredients, setIngredients] = useState([]);
	const [filteredIngredients, setFilteredIngredients] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

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
		fetchIngredients();
	}, []);

	useEffect(() => {
		setFilteredIngredients(
			ingredients.filter((ingredient) => {
				return ingredient.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
			})
		);
	}, [searchQuery]);

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleEdit = (event, ingredientId) => {
		const ingredientToEdit = ingredients.find((ingredient) => ingredient._id === ingredientId);
		setIngredientToEdit(ingredientToEdit);
	};

	const handleDelete = async (event, ingredientId) => {
		const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa nguyên liệu này không?');
		if (confirmDelete) {
			try {
				const res = await deleteIngredient(ingredientId);
				await fetchIngredients();
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className="container-fluid">
			<HeaderContent name={'Nguyên liệu'} />
			{/* <IngredientsForm ingredientToEdit={ingredientToEdit} setIngredientToEdit={setIngredientToEdit} /> */}
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-header">
							<h3 className="card-title">Danh sách nguyên liệu</h3>
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
										<th>Loại</th>
										<th>Số lượng</th>
										<th>Đơn vị</th>
										<th>Ngày tạo</th>
									</tr>
								</thead>

								<tbody>
									{filteredIngredients.map((ingredient) => (
										<tr key={ingredient._id}>
											<td>{ingredient.name}</td>
											<td>{ingredient.type}</td>
											<td>{ingredient.amount}</td>
											<td>{ingredient.unit.name}</td>
											<td>{ingredient.createdAt}</td>
											<td>
												<button
													className="btn btn-block btn-outline-primary"
													onClick={(event) => {
														handleEdit(event, ingredient._id);
													}}
												>
													Chỉnh sửa
												</button>
											</td>
											<td>
												<button
													className="btn btn-block btn-outline-danger"
													onClick={(event) => {
														handleDelete(event, ingredient._id);
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
			;
		</div>
	);
};

export default IngredientsPage;
