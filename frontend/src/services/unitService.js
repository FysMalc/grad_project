import axios from 'axios';

const getUnits = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/unit/getAll`);
	return res;
};

const getUnit = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/unit/get/${id}`);
	return res;
};

const createUnit = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/unit/create`, data);
	return res;
};

const deleteUnit = async (id, access_token) => {
	const res = await axios.delete(`${process.env.REACT_APP_API_URL}/unit/delete/${id}`, {
		headers: {
			token: `Bearer ${access_token}`,
		},
	});
	return res;
};

export { getUnits, getUnit, createUnit, deleteUnit };
