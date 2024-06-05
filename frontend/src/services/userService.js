import axios from 'axios';

const axiosJWT = axios.create();

const loginUser = async (data) => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data);
	return res;
};

const signupUser = async (data, refresh_token) => {
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, data, {
			headers: {
				authorization: `Bearer ${refresh_token}`,
			},
		});
		return res.data;
	} catch (error) {
		return error;
	}
};

const logoutUser = async () => {
	const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
	return res.data;
};

const updateUser = async (id, data, refresh_token) => {
	const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
		headers: {
			authorization: `Bearer ${refresh_token}`,
		},
	});
	return res.data;
};

const deleteUser = async (id, refresh_token) => {
	const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
		headers: {
			authorization: `Bearer ${refresh_token}`,
		},
	});

	return res.data;
};

const getAllUser = async () => {
	const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`);

	return res;
};

export { loginUser, signupUser, logoutUser, updateUser, deleteUser, getAllUser };
