import React, { useEffect, useState } from 'react';

import HeaderContent from '../components/HeaderContent/HeaderContent';
import { createBill } from '../services/billService.js';
import { getMeals } from '../services/mealService.js';

const TablePage = () => {
	const [availableFoods, setAvailableFoods] = useState([]);

	const [selectedTableId, setSelectedTableId] = useState(null);
	const [orderedFoods, setOrderedFoods] = useState([]);
	const [tableHasOrders, setTableHasOrders] = useState({});

	const [orderedFoodsPerTable, setOrderedFoodsPerTable] = useState(() => {
		const storedOrderedFoods = localStorage.getItem('orderedFoodsPerTable');
		return storedOrderedFoods ? JSON.parse(storedOrderedFoods) : {};
	});

	const [reservedTables, setReservedTables] = useState(() => {
		const storedReservedTables = localStorage.getItem('reservedTables');
		return storedReservedTables ? JSON.parse(storedReservedTables) : {};
	});

	const [tableNotes, setTableNotes] = useState(() => {
		const storedTableNotes = localStorage.getItem('tableNotes');
		return storedTableNotes ? JSON.parse(storedTableNotes) : {};
	});

	const [amountPaid, setAmountPaid] = useState(0);
	const [serviceFeePercentage, setServiceFeePercentage] = useState(10); // Set the service fee percentage here
	const [voucherDiscount, setVoucherDiscount] = useState(0);
	const tablesPerRow = 4;

	const [dailyRevenue, setDailyRevenue] = useState(0);
	const [tablesServed, setTablesServed] = useState(0);

	useEffect(() => {
		const fetchAvailableFoods = async () => {
			try {
				const response = await getMeals();

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

	useEffect(() => {
		const storedDailyRevenue = localStorage.getItem('dailyRevenue');
		const storedTablesServed = localStorage.getItem('tablesServed');

		if (storedDailyRevenue) {
			setDailyRevenue(JSON.parse(storedDailyRevenue));
		}

		if (storedTablesServed) {
			setTablesServed(JSON.parse(storedTablesServed));
		}
	}, []);

	const handleOnClick = (tableId) => {
		setSelectedTableId(tableId);
		setOrderedFoods(orderedFoodsPerTable[tableId] || []); // Retrieve ordered foods from local storage for the selected table
	};
	const handleOnChange = (tableId, event) => {
		setReservedTables((prevReservedTables) => {
			const updatedReservedTables = { ...prevReservedTables };
			updatedReservedTables[tableId] = !prevReservedTables[tableId];
			localStorage.setItem('reservedTables', JSON.stringify(updatedReservedTables));
			return updatedReservedTables;
		});
	};

	const handleNoteChange = (tableId, event) => {
		const newNoteValue = event.target.value;

		setTableNotes((prevTableNotes) => {
			const updatedTableNotes = { ...prevTableNotes };
			updatedTableNotes[tableId] = newNoteValue;
			localStorage.setItem('tableNotes', JSON.stringify(updatedTableNotes));
			return updatedTableNotes;
		});
	};

	const calculateTotalAmountForTable = (tableId) => {
		const orderedFoodsForTable = orderedFoodsPerTable[tableId] || [];
		return orderedFoodsForTable.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
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

		window.$('#modal-default').modal('hide');
		window.$('#payment-modal').modal('show');
		// Implement your logic to handle form submission
	};

	const handlePayment = async () => {
		try {
			const billData = {
				table: selectedTableId,
				orders: orderedFoods.map((item) => ({
					mealID: item.id,
					mealName: item.name,
					quantity: item.quantity,
				})),
				ordersCost: calculateTotalAmountForTable(selectedTableId),
				serviceFee: (calculateTotalAmountForTable(selectedTableId) * serviceFeePercentage) / 100,
				voucher: voucherDiscount,
				total:
					calculateTotalAmountForTable(selectedTableId) +
					(calculateTotalAmountForTable(selectedTableId) * serviceFeePercentage) / 100 -
					voucherDiscount,
			};

			console.log('Dữ liệu trước khi tạo hoá đơn: ', billData);
			const res = await createBill(billData);
			console.log('Thông tin hoá đơn đã được tạo: ', res.data);

			const currentTotal = billData.total;
			setDailyRevenue((prevRevenue) => {
				localStorage.setItem('dailyRevenue', JSON.stringify(prevRevenue + currentTotal));
				return prevRevenue + currentTotal;
			});
			setTablesServed((prevTablesServed) => {
				localStorage.setItem('tablesServed', JSON.stringify(prevTablesServed + 1));
				return prevTablesServed + 1;
			});
			console.log(currentTotal);
			// Store daily revenue and tables served in local storage

			clearOrderDataForTable(selectedTableId);
			// Xử lý thành công sau khi tạo hóa đơn mới
		} catch (err) {
			console.error('Error creating bill:', err);
			// Xử lý lỗi khi tạo hóa đơn
		}
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

	const handleAmountPaidChange = (event) => {
		setAmountPaid(parseFloat(event.target.value));
	};

	const handleServiceFeePercentageChange = (event) => {
		setServiceFeePercentage(parseFloat(event.target.value));
	};

	const handleVoucherDiscountChange = (event) => {
		if (event.target.value) setVoucherDiscount(parseFloat(event.target.value));
		else setVoucherDiscount(0);
	};
	const clearOrderDataForTable = (tableId) => {
		setOrderedFoodsPerTable((prevOrderedFoodsPerTable) => {
			const updatedOrderedFoodsPerTable = { ...prevOrderedFoodsPerTable };
			delete updatedOrderedFoodsPerTable[tableId];
			localStorage.setItem('orderedFoodsPerTable', JSON.stringify(updatedOrderedFoodsPerTable));
			return updatedOrderedFoodsPerTable;
		});

		setTableHasOrders((prevTableHasOrders) => {
			const updatedTableHasOrders = { ...prevTableHasOrders };
			delete updatedTableHasOrders[tableId];
			return updatedTableHasOrders;
		});
	};

	const calculateChange = () => {
		const totalAmount = calculateTotalAmountForTable(selectedTableId);
		const serviceFee = (totalAmount * serviceFeePercentage) / 100;
		const grandTotal = totalAmount + serviceFee - (totalAmount * voucherDiscount) / 100;
		const change = amountPaid - grandTotal;
		return change >= 0 ? change : 0;
	};
	const renderRows = () => {
		const rows = [];
		const totalTables = 40;
		const numRows = Math.ceil(totalTables / tablesPerRow);

		for (let i = 0; i < numRows; i++) {
			const rowTables = [];
			for (let j = 0; j < tablesPerRow; j++) {
				const tableIndex = i * tablesPerRow + j;
				if (tableIndex >= totalTables) break;
				const tableId = tableIndex + 1;
				const hasOrder = tableHasOrders[tableId] || false; // Check if the table has orders
				const isReserved = reservedTables[tableId] || false;
				const noteValue = tableNotes[tableId] || '';

				rowTables.push(
					<div key={tableIndex} className="col-md-3 col-sm-6 col-12">
						<div className="info-box row">
							<span
								className={`info-box-icon ${isReserved ? 'bg-danger' : hasOrder ? 'bg-success' : 'bg-info'} col-md-6`}
								onClick={() => handleOnClick(tableId)}
								data-toggle="modal"
								data-target="#table-modal"
							>
								<i className="fas fa-receipt"></i>
							</span>
							<div className="info-box-content col-md-6">
								<span className="info-box-text" style={{ fontFamily: 'inherit' }}>
									{`Bàn ${tableId}`}
								</span>
							</div>
							<div className="form-check col-md-6" style={{ marginLeft: 20 }}>
								<input
									key={tableId}
									type="checkbox"
									className="form-check-input"
									checked={isReserved}
									onChange={(e) => handleOnChange(tableId, e)}
								/>
								<label className="form-check-label">Đặt bàn</label>
								<input
									type="text"
									className="form-control"
									onChange={(e) => handleNoteChange(tableId, e)}
									value={noteValue}
								/>
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
		<>
			<HeaderContent name={'Danh sách bàn'} />

			<section className="content">
				<div className="container-fluid">
					<button className="btn btn-outline-primary" data-toggle="modal" data-target="#statistic">
						Doanh thu
					</button>
					{renderRows()}
					<div className="modal fade" id="table-modal">
						<div className="modal-dialog modal-xl">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title">{`Bàn ${selectedTableId}`}</h4>

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
												<div className="table-responsive">
													<table className="table table-stripped">
														<thead>
															<tr>
																<th>Món ăn</th>
																<th>Số lượng</th>
																<th>Giá</th>
																<th></th>
																<th></th>
															</tr>
														</thead>
														<tbody>
															{orderedFoods.map((item, index) => {
																return (
																	<tr key={index}>
																		<td>{item.name}</td>
																		<td>{item.quantity}</td>
																		<td>{(item.price * item.quantity).toLocaleString()} đ</td>
																		<td>
																			<button
																				type="button"
																				className="btn btn-outline-danger"
																				onClick={() => handleDecrement(item)}
																			>
																				-
																			</button>
																		</td>
																		<td>
																			<button
																				type="button"
																				className="btn btn-outline-primary"
																				onClick={() => handleIncrement(item)}
																			>
																				+
																			</button>
																		</td>
																	</tr>
																);
															})}
														</tbody>
													</table>
												</div>
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
									<div>
										<span>Tổng tiền: {calculateTotalAmountForTable(selectedTableId).toLocaleString()} đ</span>
									</div>
									<button type="button" className="btn btn-primary" onClick={handleFormSubmit} data-dismiss="modal">
										Đến thanh toán
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="modal fade" id="payment-modal">
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">{`Thanh toán bàn ${selectedTableId}`}</h4>
							<button type="button" className="close" data-dismiss="modal">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body row">
							<div className="table-responsive col-md-6">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Món ăn</th>
											<th>Số lượng</th>
											<th>Giá</th>
										</tr>
									</thead>
									<tbody>
										{orderedFoods.map((item, index) => (
											<tr key={index}>
												<td>{item.name}</td>
												<td>{item.quantity}</td>
												<td>{(item.price * item.quantity).toLocaleString()} đ</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="amountPaid">Số tiền khách đưa:</label>
									<input
										type="number"
										id="amountPaid"
										className="form-control"
										value={amountPaid}
										onChange={handleAmountPaidChange}
									/>
									<label htmlFor="serviceFeePercentage">Phí dịch vụ (%):</label>
									<input
										type="number"
										id="serviceFeePercentage"
										className="form-control"
										value={serviceFeePercentage}
										onChange={handleServiceFeePercentageChange}
									/>
									<label htmlFor="voucherDiscount">Voucher giảm giá:</label>
									<input
										type="number"
										id="voucherDiscount"
										className="form-control"
										value={voucherDiscount}
										onChange={handleVoucherDiscountChange}
									/>
									<div className="form-group">
										<label>Tổng tiền:</label>
										<p>{calculateTotalAmountForTable(selectedTableId).toLocaleString()} đ</p>
									</div>
									<div className="form-group">
										<label>Phí dịch vụ ({serviceFeePercentage}%):</label>
										<p>
											{((calculateTotalAmountForTable(selectedTableId) * serviceFeePercentage) / 100).toLocaleString()}{' '}
											đ
										</p>
									</div>
									<div className="form-group">
										<label>Tổng cộng:</label>
										<p>
											{(
												calculateTotalAmountForTable(selectedTableId) +
												(calculateTotalAmountForTable(selectedTableId) * serviceFeePercentage) / 100 -
												(calculateTotalAmountForTable(selectedTableId) * voucherDiscount) / 100
											).toLocaleString()}{' '}
											đ
										</p>
									</div>
									<div className="form-group">
										<label>Tiền thừa:</label>
										<p>{calculateChange().toLocaleString()} đ</p>
									</div>
								</div>
							</div>
						</div>

						<div className="modal-footer justify-content-between">
							<button type="button" className="btn btn-danger" data-dismiss="modal">
								Đóng
							</button>
							<button type="button" className="btn btn-primary" onClick={(e) => handlePayment()} data-dismiss="modal">
								Thanh toán
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="statistic">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Doanh thu trong ca</h5>
							<button type="button" className="close" data-dismiss="modal">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<p>Doanh thu: {dailyRevenue.toLocaleString()} đ</p>
							<p>Tổng hoá đơn: {tablesServed}</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TablePage;
