const convertTimestamp = (timestamp) => {
	return new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
};

export { convertTimestamp };
