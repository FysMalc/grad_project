import axios from 'axios';

const getDisposeNotes = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/dispose-note/getAll`);

	return res.data;
};

const getDisposeNote = async (id) => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/dispose-note/get/${id}`);

	return res.data;
};

const createDisposeNote = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/dispose-note/create`, data);

	return res;
};

export { getDisposeNotes, getDisposeNote, createDisposeNote };
