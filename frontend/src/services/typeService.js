import axios from 'axios';

const getTypes = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/type/getAll`);
	return res;
};

const getType = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/type/get/${id}`);
	return res;
};

const createType = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/type/create`, data);
	return res;
};

const deleteType = async (id, access_token) => {
	const res = await axios.delete(`${process.env.REACT_APP_API_URL}/type/delete/${id}`, {
		headers: {
			token: `Bearer ${access_token}`,
		},
	});
	return res;
};

export { getTypes, getType, createType, deleteType };
