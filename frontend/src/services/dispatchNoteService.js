import axios from 'axios';

const getDispatchNotes = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/dispatch-note/getAll`);
	return res.data;
};

const getDispatchNote = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/dispatch-note/get/${id}`);
	return res.data;
};

const createDispatchNote = async () => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/dispatch-note/create`);
	return res.data;
};

export { getDispatchNotes, getDispatchNote, createDispatchNote };
