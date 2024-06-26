import 'react-datepicker/dist/react-datepicker.css';

import { React, useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import HeaderContent from '../components/HeaderContent/HeaderContent';
import { convertTimestamp } from '../utils/convertTz';
import { getAllBills } from '../services/billService';

const BillPage = () => {
	const [bills, setBills] = useState([]);
	const [selectedRowData, setSelectedRowData] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [filteredBills, setFilteredBills] = useState([]);

	const fetchBills = async () => {
		try {
			const res = await getAllBills();
			// console.log(res);

			setBills(res.data);
			setFilteredBills(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBills();
	}, []);

	// function padZero(value) {
	// 	return value.toString().padStart(2, '0');
	// }

	const filter = (date) => {
		setStartDate(date);
		if (!date) {
			setFilteredBills(bills);
		} else {
			const filteredBillsByDate = bills.filter((bill) => {
				const billDate = new Date(bill.createdAt);
				return (
					billDate.getDate() === date.getDate() &&
					billDate.getMonth() === date.getMonth() &&
					billDate.getFullYear() === date.getFullYear()
				);
			});
			setFilteredBills(filteredBillsByDate);
		}
	};

	const logDate = (date) => {
		console.log(date);
		const newDate = new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
		try {
			console.log(date.getDate());
		} catch (err) {}
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
									<div className="card-body table-responsive p-0" style={{ height: 600 }}>
										<table id="bill" className="table  table-hover table-head-fixed ">
											<thead>
												<tr>
													<th>Bàn</th>
													<th>Thời gian</th>
													<th>Tổng tiền</th>
													<th>Thu ngân</th>
												</tr>
											</thead>
											<tbody>
												{filteredBills.map((bill) => (
													<tr key={bill._id} onClick={(e) => setSelectedRowData(bill)}>
														<td>{bill.table}</td>
														<td>{convertTimestamp(bill.createdAt)}</td>
														<td>{bill.total.toLocaleString()} đ</td>
														<td>{bill.staffName}</td>
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
					</section>
				</div>
				<div className="col-md-6">
					<DatePicker selected={startDate} onChange={(date) => filter(date)} />
					<div className="card">
						<div className="card-header">
							<h3 className="card-title">Danh sách Order bàn {selectedRowData.table ? selectedRowData.table : ''}</h3>
							<h3 className="card-title" style={{ float: 'right' }}>
								{convertTimestamp(selectedRowData.createdAt)}
							</h3>
						</div>
						<div className="card-body">
							<div className="dataTables_wrapper">
								<table className="table table-striped table-bordered">
									<thead>
										<tr>
											<th>Tên món ăn</th>
											<th>Số lượng</th>
											<th>Giá</th>
										</tr>
									</thead>
									<tbody>
										{selectedRowData &&
											selectedRowData.orders.map((meal, index) => {
												return (
													<tr key={index}>
														<td>{meal.mealName}</td>
														<td>{meal.quantity}</td>
														<td>{(meal.price * meal.quantity).toLocaleString()} đ</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
							<tr>
								<b>Thành tiền: {selectedRowData.ordersCost ? selectedRowData.ordersCost.toLocaleString() : ''} đ</b>
							</tr>
							<tr>
								<b>Phí dịch vụ: {selectedRowData.serviceFee}% </b>
							</tr>
							<tr>
								<b>Voucher: {selectedRowData.voucher}%</b>
							</tr>
							<tr>
								<b>Tổng tiền: {selectedRowData.total ? selectedRowData.total.toLocaleString() : ''} đ</b>
							</tr>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BillPage;
