import axios from 'axios';

const getIngredients = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/ingredient/getAll`);
	return res;
};

const getIngredient = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/ingredient/${id}`);
	return res.data;
};

const createIngredient = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/ingredient/create`, data);
	return res;
};

const updateIngredient = async (id, data) => {
	const res = await axios.patch(`${process.env.REACT_APP_API_URL}/ingredient/update/${id}`, data);
	return res;
};

const deleteIngredient = async (id, access_token) => {
	const res = await axios.delete(`${process.env.REACT_APP_API_URL}/ingredient/${id}`, {
		headers: {
			token: `Bearer ${access_token}`,
		},
	});
	return res.data;
};

export { getIngredients, getIngredient, createIngredient, updateIngredient, deleteIngredient };
