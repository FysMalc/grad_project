import axios from 'axios';

const getPurchaseNotes = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/purchase-note/getAll`);
	return res.data;
};

const getPurchaseNote = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/purchase-note/get/${id}`);
	return res.data;
};

const createPurchaseNote = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/purchase-note/create`, data);
	return res;
};

export { getPurchaseNotes, getPurchaseNote, createPurchaseNote };
