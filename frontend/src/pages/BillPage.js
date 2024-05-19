import 'react-datepicker/dist/react-datepicker.css';

import { React, useEffect, useState } from 'react';

import $ from 'jquery';
import DatePicker from 'react-datepicker';
import HeaderContent from '../components/HeaderContent/HeaderContent';
import { getAllBills } from '../services/billService';

const BillPage = () => {
	const [bills, setBills] = useState([]);
	const [selectedRowData, setSelectedRowData] = useState(null);
	const [startDate, setStartDate] = useState(new Date());

	const fetchBills = async () => {
		try {
			const res = await getAllBills();
			// console.log(res);
			setBills(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBills();
	}, []);

	function convertTimestamp(timestamp) {
		const date = new Date(timestamp);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const day = date.getDate();
		const month = date.getMonth() + 1; // Months are zero-indexed
		const year = date.getFullYear();

		const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
		const formattedDate = `${padZero(day)}-${padZero(month)}-${year}`;

		return `${formattedTime} ${formattedDate}`;
	}

	function padZero(value) {
		return value.toString().padStart(2, '0');
	}

	const logDate = (date) => {
		setStartDate(date);
		console.log(date);
		const newDate = new Date(date);
		console.log(newDate);
	};

	return (
		<>
			<HeaderContent name={'Hoá đơn'} />
			<div className="row">
				<div className="col-md-5">
					<section className="content">
						<div className="container-fluid">
							<div className=" col-12">
								<div className="card">
									<div className="card-header">
										<h3 className="card-title">Danh sách hoá đơn</h3>
									</div>
									{/* ./card-header */}
									<div className="card-body">
										<div className="dataTables_wrapper">
											<table id="dispatch" className="table table-bordered table-hover ">
												<thead>
													<tr>
														<th>Bàn</th>
														<th>Thời gian</th>
														<th>Tổng tiền</th>
													</tr>
												</thead>
												<tbody>
													{bills.map((bill) => (
														<tr
															key={bill._id}
															data-toggle="modal"
															data-target="#modal-default"
															onClick={(e) => setSelectedRowData(bill)}
														>
															<td>{bill.table}</td>
															<td>{convertTimestamp(bill.createdAt)}</td>
															<td>{bill.total.toLocaleString()} đ</td>
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
													<h4 className="modal-title">Danh sách order</h4>
													<button type="button" className="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">×</span>
													</button>
												</div>
												<div className="modal-body">
													<table className="table table-stripped dataTables_filter">
														<thead>
															<tr>
																<th>Món ăn</th>
																<th>Số lượng</th>

																{/* <th>Giá</th>
														<th></th>
														<th></th> */}
															</tr>
														</thead>
														<tbody>
															{selectedRowData &&
																selectedRowData.orders.map((meal, index) => {
																	return (
																		<tr key={index}>
																			<td>{meal.mealName}</td>
																			<td>{meal.quantity}</td>
																			{/* <td>{(meal.price * item.quantity).toLocaleString()} đ</td> */}
																		</tr>
																	);
																})}
														</tbody>
													</table>
													{/* {selectedRowData &&
												selectedRowData.orders.map((meal, index) => (
													<div key={index}>
														<p>
															{meal.mealName} - {meal.quantity}
														</p>
													</div>
												))} */}
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
								<div id="daterangepicker"></div>
								{/* /.card */}
							</div>
						</div>
					</section>
				</div>
				<div className="col-md-6">
					<DatePicker selected={startDate} onChange={(date) => logDate(date)} />
				</div>
			</div>
		</>
	);
};

export default BillPage;
