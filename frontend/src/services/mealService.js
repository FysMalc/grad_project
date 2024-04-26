import axios from 'axios';

const getMeals = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/meal/getAll`);
	return res.data;
};

const getMeal = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/meal/get/${id}`);
	return res.data;
};

const createMeal = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/meal/create`, data);
	return res;
};

const updateMeal = async (id, data) => {
	const res = await axios.patch(`${process.env.REACT_APP_API_URL}/meal/update/${id}`, data);
	return res;
};

const deleteMeal = async (id, access_token) => {
	const res = await axios.delete(`${process.env.REACT_APP_API_URL}/meal/delete/${id}`, {
		headers: {
			token: `Bearer ${access_token}`,
		},
	});
	return res.data;
};

export { getMeals, getMeal, createMeal, updateMeal, deleteMeal };
