import { React, useEffect, useState } from 'react';
import { deleteMeal, getMeals } from '../services/mealService';

import HeaderContent from '../components/HeaderContent/HeaderContent';

const MealsPage = () => {
	const [mealToEdit, setMealToEdit] = useState(null);
	const [meals, setMeals] = useState([]);
	const [filteredMeals, setFilteredMeals] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

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
	useEffect(() => {
		fetchMeals();
	}, []);

	useEffect(() => {
		setFilteredMeals(
			meals.filter((meal) => {
				return meal.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
			})
		);
	}, [searchQuery]);

	const handleSearch = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleEdit = (event, mealId) => {
		const mealToEdit = meals.find((meal) => meal._id === mealId);
		setMealToEdit(mealToEdit);
	};

	const handleDelete = async (event, mealId) => {
		const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa món ăn này không?');
		if (confirmDelete) {
			try {
				const res = await deleteMeal(mealId);
				await fetchMeals();
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className="container-fluid">
			<HeaderContent name={'Món ăn'} />
			{/* <MealsForm mealToEdit={mealToEdit} setMealToEdit={setMealToEdit} /> */}
			<div className="row">
				<div className="col-12">
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
						<div className="card-body table-responsive p-0">
							<table className="table table-hover text-nowrap">
								<thead>
									<tr>
										<th>Tên</th>
										<th>Giá</th>
										<th>Ngày tạo</th>
										<th>Nguyên liệu</th>
									</tr>
								</thead>

								<tbody>
									{filteredMeals.map((meal) => (
										<tr key={meal._id}>
											<td>{meal.name}</td>
											<td>{meal.price.toLocaleString()} đ</td>
											<td>{meal.createdAt}</td>
											<td>
												{meal.ingredients.map((ingredient) => (
													<p key={ingredient.ingredient._id}>
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
													className="btn btn-block btn-outline-danger"
													onClick={(event) => {
														handleDelete(event, meal._id);
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

export default MealsPage;
