import axios from 'axios';

const getDisposeNotes = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/dispose-note/getAll`);

	return res.data;
};

const getDisposeNote = async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/dispose-note/get/${id}`);

	return res.data;
};

const createDisposeNote = async () => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/dispose-note/create`);

	return res.data;
};
