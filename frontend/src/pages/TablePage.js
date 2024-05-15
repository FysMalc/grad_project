import React, { useEffect, useState } from 'react';

import Table from '../components/Table.js';
import { getMeals } from '../services/mealService.js';

const TablePage = () => {
	const [availableFoods, setAvailableFoods] = useState([]);
	const [showTables, setShowTables] = useState(new Array(10).fill(false));
	const [selectedTableId, setSelectedTableId] = useState(null);
	const [orderedFoods, setOrderedFoods] = useState([]);

	const [tableHasOrders, setTableHasOrders] = useState({});
	const [orderedFoodsPerTable, setOrderedFoodsPerTable] = useState(() => {
		const storedOrderedFoods = localStorage.getItem('orderedFoodsPerTable');
		return storedOrderedFoods ? JSON.parse(storedOrderedFoods) : {};
	});
	const tablesPerRow = 6;

	useEffect(() => {
		const fetchAvailableFoods = async () => {
			try {
				const response = await getMeals();
				console.log(response);
				setAvailableFoods(response);
			} catch (error) {
				console.error('Error fetching available foods', error);
			}
		};
		fetchAvailableFoods();
	}, []);

	useEffect(() => {
		const updatedTableHasOrders = {};

		for (const tableId in orderedFoodsPerTable) {
			updatedTableHasOrders[tableId] = orderedFoodsPerTable[tableId]?.length > 0;
		}

		setTableHasOrders(updatedTableHasOrders);
	}, [orderedFoodsPerTable]);

	const handleOnClick = (tableId) => {
		setSelectedTableId(tableId);
		setOrderedFoods(orderedFoodsPerTable[tableId] || []); // Retrieve ordered foods from local storage for the selected table
	};

	const handleOrderFood = (food) => {
		setOrderedFoods((prevOrderedFoods) => {
			const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food._id);
			if (existingFoodIndex !== -1) {
				const updatedFood = {
					...prevOrderedFoods[existingFoodIndex],
					quantity: prevOrderedFoods[existingFoodIndex].quantity + 1,
				};
				const updatedOrderedFoods = [...prevOrderedFoods];
				updatedOrderedFoods[existingFoodIndex] = updatedFood;
				setOrderedFoodsPerTable((prevOrderedFoodsPerTable) => {
					const updatedOrderedFoodsPerTable = { ...prevOrderedFoodsPerTable };
					updatedOrderedFoodsPerTable[selectedTableId] = updatedOrderedFoods;
					localStorage.setItem('orderedFoodsPerTable', JSON.stringify(updatedOrderedFoodsPerTable));
					return updatedOrderedFoodsPerTable;
				});
				return updatedOrderedFoods;
			} else {
				const newOrder = { id: food._id, name: food.name, quantity: 1, price: food.price };
				const updatedOrderedFoods = [...prevOrderedFoods, newOrder];
				setOrderedFoodsPerTable((prevOrderedFoodsPerTable) => {
					const updatedOrderedFoodsPerTable = { ...prevOrderedFoodsPerTable };
					updatedOrderedFoodsPerTable[selectedTableId] = updatedOrderedFoods;
					localStorage.setItem('orderedFoodsPerTable', JSON.stringify(updatedOrderedFoodsPerTable));
					setTableHasOrders((prevTableHasOrders) => ({
						...prevTableHasOrders,
						[selectedTableId]: updatedOrderedFoods?.length > 0 ? true : false,
					}));

					return updatedOrderedFoodsPerTable;
				});
				return updatedOrderedFoods;
			}
		});
		setTableHasOrders[selectedTableId] = true;
		console.log(tableHasOrders);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		// Implement your logic to handle form submission
	};

	const handleIncrement = (food) => {
		setOrderedFoods((prevOrderedFoods) => {
			const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food.id);
			if (existingFoodIndex !== -1) {
				const updatedFood = {
					...prevOrderedFoods[existingFoodIndex],
					quantity: prevOrderedFoods[existingFoodIndex].quantity + 1,
				};
				const updatedOrderedFoods = [...prevOrderedFoods];
				updatedOrderedFoods[existingFoodIndex] = updatedFood;
				setOrderedFoodsPerTable((prevOrderedFoodsPerTable) => {
					const updatedOrderedFoodsPerTable = { ...prevOrderedFoodsPerTable };
					updatedOrderedFoodsPerTable[selectedTableId] = updatedOrderedFoods;
					localStorage.setItem('orderedFoodsPerTable', JSON.stringify(updatedOrderedFoodsPerTable));
					setTableHasOrders((prevTableHasOrders) => ({
						...prevTableHasOrders,
						[selectedTableId]: updatedOrderedFoods.length > 0 ? true : false,
					}));
					return updatedOrderedFoodsPerTable;
				});
				return updatedOrderedFoods;
			}
			return prevOrderedFoods;
		});
	};

	const handleDecrement = (food) => {
		setOrderedFoods((prevOrderedFoods) => {
			const existingFoodIndex = prevOrderedFoods.findIndex((item) => item.id === food.id);
			if (existingFoodIndex !== -1) {
				if (prevOrderedFoods[existingFoodIndex].quantity > 1) {
					const updatedFood = {
						...prevOrderedFoods[existingFoodIndex],
						quantity: prevOrderedFoods[existingFoodIndex].quantity - 1,
					};
					const updatedOrderedFoods = [...prevOrderedFoods];
					updatedOrderedFoods[existingFoodIndex] = updatedFood;
					setOrderedFoodsPerTable((prevOrderedFoodsPerTable) => {
						const updatedOrderedFoodsPerTable = { ...prevOrderedFoodsPerTable };
						updatedOrderedFoodsPerTable[selectedTableId] = updatedOrderedFoods;
						localStorage.setItem('orderedFoodsPerTable', JSON.stringify(updatedOrderedFoodsPerTable));
						return updatedOrderedFoodsPerTable;
					});
					return updatedOrderedFoods;
				} else {
					const updatedOrderedFoods = prevOrderedFoods.filter((item) => item.id !== food.id);
					setOrderedFoodsPerTable((prevOrderedFoodsPerTable) => {
						const updatedOrderedFoodsPerTable = { ...prevOrderedFoodsPerTable };
						updatedOrderedFoodsPerTable[selectedTableId] = updatedOrderedFoods;
						localStorage.setItem('orderedFoodsPerTable', JSON.stringify(updatedOrderedFoodsPerTable));
						setTableHasOrders((prevTableHasOrders) => ({
							...prevTableHasOrders,
							[selectedTableId]: updatedOrderedFoods?.length > 0 ? true : false,
						}));
						return updatedOrderedFoodsPerTable;
					});
					return updatedOrderedFoods;
				}
			}
			return prevOrderedFoods;
		});
	};

	const renderRows = () => {
		const rows = [];
		const totalTables = 30;
		const numRows = Math.ceil(totalTables / tablesPerRow);

		for (let i = 0; i < numRows; i++) {
			const rowTables = [];
			for (let j = 0; j < tablesPerRow; j++) {
				const tableIndex = i * tablesPerRow + j;
				if (tableIndex >= totalTables) break;
				const tableId = tableIndex + 1;
				const hasOrder = tableHasOrders[tableId] || false; // Check if the table has orders

				rowTables.push(
					<div key={tableIndex} className="col-md-2 col-sm-6 col-12">
						<div
							className="info-box"
							onClick={() => handleOnClick(tableId)}
							data-toggle="modal"
							data-target="#modal-default"
						>
							<span className={`info-box-icon ${hasOrder ? 'bg-success' : 'bg-info'} `}>
								<i className="fas fa-receipt"></i>
							</span>
							<div className="info-box-content">
								<span className="info-box-text" style={{ fontFamily: 'inherit' }}>
									{`Bàn ${tableId}`}
								</span>
							</div>
						</div>
					</div>
				);
			}
			rows.push(
				<div key={i} className="row">
					{rowTables}
				</div>
			);
		}
		return rows;
	};

	const renderAvailableFoods = () => {
		const foodRows = [];
		for (let i = 0; i < availableFoods.length; i += 2) {
			const food1 = availableFoods[i];
			const food2 = availableFoods[i + 1];
			foodRows.push(
				<div key={i} className="row">
					<div className="col-md-6">
						<button
							key={food1._id}
							className="btn btn-block btn-outline-primary mb-2"
							onClick={() => handleOrderFood(food1)}
						>
							{food1.name}
						</button>
					</div>
					{food2 && (
						<div className="col-md-6">
							<button
								key={food2._id}
								className="btn btn-block btn-outline-primary mb-2"
								onClick={() => handleOrderFood(food2)}
							>
								{food2.name}
							</button>
						</div>
					)}
				</div>
			);
		}
		return foodRows;
	};

	return (
		<div className="container-fluid">
			{renderRows()}
			<div className="modal fade" id="modal-default">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">{`Table ${selectedTableId}`}</h4>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body row">
							<div className="oredered-foods col-md-6">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Món đã gọi</h3>
									</div>
									<div className="card-body p-0">
										<ul>
											{orderedFoods.map((item, index) => {
												return (
													<li key={index}>
														{item.name} x{item.quantity} ({(item.price * item.quantity).toLocaleString()} đ)
														<button type="button" onClick={() => handleDecrement(item)}>
															-
														</button>
														<button type="button" onClick={() => handleIncrement(item)}>
															+
														</button>
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</div>
							<div className="available-foods col-md-6">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Menu</h3>
									</div>
									<div className="card-body p-0">{renderAvailableFoods()}</div>
								</div>
							</div>
						</div>
						<div className="modal-footer justify-content-between">
							<button type="button" className="btn btn-danger" data-dismiss="modal">
								Đóng
							</button>
							<button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TablePage;
