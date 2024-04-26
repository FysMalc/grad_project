import { React, useEffect, useState } from 'react';

const TestPage = () => {
	const [data, setData] = useState('');

	useEffect(() => {
		console.log('chạy r');
		const fetchData = async () => {
			try {
				const response = await fetch('https://xoi247.com/MOTARO-TEST/api/ChungTuDonHang/List_ChungTuDonHang', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						/* data for the first API */
					}),
				});

				const data = await response.json();

				setData(data.Data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{data ? (
				<div>
					<h2>Data from API 1</h2>
					<pre>{JSON.stringify(data)}</pre>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default TestPage;
