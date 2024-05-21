import axios from 'axios';

const axiosJWT = axios.create();

const loginUser = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data);
	return res;
};

const signupUser = async (data) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, data);
		return res.data;
	} catch (error) {
		return error;
	}
};

const logoutUser = async () => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
	return res.data;
};

const updateUser = async (id, data, access_token) => {
	const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
		headers: {
			token: `Bearer ${access_token}`,
		},
	});
	return res.data;
};

const deleteUser = async (id, data, access_token) => {
	const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, {
		headers: {
			token: `Bearer ${access_token}`,
		},
	});

	return res.data;
};

const getAllUser = async (access_token) => {
	const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
		headers: {
			token: `Bearer ${access_token}`,
		},
	});

	return res.data;
};

export { loginUser, signupUser, logoutUser, updateUser, deleteUser, getAllUser };
