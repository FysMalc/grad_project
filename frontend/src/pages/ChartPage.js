import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { Cell, Pie, PieChart } from 'recharts';
import { React, useEffect, useState } from 'react';
import { getConsumedIngredient, getRevenue } from '../services/billService';

import HeaderContent from '../components/HeaderContent/HeaderContent';
import { convertTimestamp } from '../utils/convertTz';

const RevenueBarChart = () => {
	const months = [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12',
	];
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

	const [billsRevenue, setBillsRevenue] = useState([]);
	const [consumedIngredients, setConsumedIngredients] = useState([]);

	const fetchRevenue = async () => {
		try {
			const res = await getRevenue();
			console.log('đây là res ', res);
			setBillsRevenue(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchConsumedIngredients = async () => {
		try {
			const res = await getConsumedIngredient();
			setConsumedIngredients(res.data);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRevenue();
		fetchConsumedIngredients();
	}, []);

	const data = months.map((month, index) => {
		const monthData = billsRevenue.find((bill) => bill._id === index + 1);
		const revenue = monthData ? monthData.totalRevenue : 0;
		return {
			month,
			'Doanh thu': revenue,
			formattedRevenue: revenue ? revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 ₫',
		};
	});

	const ingredient = consumedIngredients.map(({ _id, totalQuantity }) => ({
		ingredient: _id,
		quantity: parseFloat(totalQuantity.toFixed(2)),
	}));

	return (
		<div className="container-fluid">
			<HeaderContent name={'Thống kê'} />
			<section className="content">
				<div className="container-fluid">
					<div className="card card-success card-outline" style={{ width: 1200 }}>
						<div className="card-header">
							<h3 className="card-title">Thống kê doanh thu theo tháng</h3>
						</div>
						<div className="card-body">
							<div className="chart">
								<div className="chartjs-size-monitor">
									<BarChart width={1100} height={400} data={data} style={{ float: 'right' }}>
										<XAxis dataKey="month" />
										<YAxis domain={[0, 'auto']} />
										<Tooltip
											formatter={(value) => data.find((entry) => entry['Doanh thu'] === value).formattedRevenue}
										/>
										<Legend />
										<CartesianGrid strokeDasharray="3 3" />
										<Bar dataKey="Doanh thu" fill="#1cb4eb" />
									</BarChart>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <PieChart width={800} height={400}>
				<Pie data={ingredient} dataKey="quantity" nameKey="ingredient" cx="50%" cy="50%" outerRadius={120} label>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend />
			</PieChart> */}
		</div>
	);
};

export default RevenueBarChart;
