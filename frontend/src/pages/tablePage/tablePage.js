import React, { useEffect, useState } from 'react';

import ButtonDiv from '../../components/Button/Button';
import axios from 'axios';

const TablePage = () => {
	const [availableFoods, setAvailableFoods] = useState([]);
	const [showTables, setShowTables] = useState(new Array(10).fill(false));
	useEffect(() => {
		const fetchAvailableFoods = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_URL}/meal/getAll`);
				console.log(response.data);
				setAvailableFoods(response.data);
			} catch (error) {
				console.error('Error fetching available foods', error);
			}
		};

		fetchAvailableFoods();
	}, []);

	const handleOnClick = (tableId) => {
		setShowTables((prevShowTables) => {
			const updatedShowTables = [...prevShowTables];
			updatedShowTables.forEach((showTable, i) => {
				if (i === tableId - 1) return;
				updatedShowTables[i] = false;
			});
			updatedShowTables[tableId - 1] = !updatedShowTables[tableId - 1];
			return updatedShowTables;
		});
	};

	return (
		<div className="bg-light">
			{Array.from({ length: 10 }, (_, i) => (
				<ButtonDiv
					className="btn btn-primary"
					key={i}
					tableId={i + 1}
					availableFoods={availableFoods}
					onClick={() => handleOnClick(i + 1)}
					showTable={showTables[i]}
				/>
			))}
		</div>
	);
};

export default TablePage;
