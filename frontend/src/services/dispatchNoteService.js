import axios from 'axios';

const getDispatchNotes = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/dispatch-note/getAll`);
	return res.data;
};

const getDispatchNote = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/dispatch-note/get/${id}`);
	return res.data;
};

const createDispatchNote = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/dispatch-note/create`, data);
	return res;
};

export { getDispatchNotes, getDispatchNote, createDispatchNote };
