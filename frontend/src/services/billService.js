import axios from 'axios';

const getAllBills = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/bill/getAll`);
	return res;
};

const createBill = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/bill/create`, data);
	return res;
};

const getRevenue = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/bill/getRevenue`);

	return res;
};

const getConsumedIngredient = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/bill/getConsumedIngredient`);
	return res;
};

export { getAllBills, createBill, getRevenue, getConsumedIngredient };
