const Staff = require('../models/staffModel');
const mongoose = require('mongoose');

const getAllStaffs = async (req, res) => {
	const staffs = await Staff.find({}).sort({ createdAt: -1 });
	return res.status(200).json(staffs);
};

const createStaff = async (req, res) => {
	const { name } = req.body;
	const now = new Date();
	const nameRegex = new RegExp(`^${name}$`, 'i');
	const staff = await Staff.findOne({ name: nameRegex });
	if (staff) {
		return res.status(500).json({ error: 'Tên nhân viên đã tồn tại' });
	}
	try {
		const staff = await Staff.create({ name, createdAt: now });
		res.status(200).json(staff);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateStaff = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID không hợp lệ' });
	}

	const staff = await Staff.findOneAndUpdate(
		{
			_id: id,
		},
		{
			...req.body,
		}
	);

	res.send(staff);
	if (staff) {
		return res.status(404).json({ error: 'Nhân viên không tồn tại' });
	}

	res.status(200).json(staff);
};

const deleteStaff = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'ID không hợp lệ' });
	}
	const staff = await Staff.findByIdAndDelete({ _id: id });

	if (!staff) return res.status(404).json({ error: 'Nhân viên không tồn tại' });
	return res.status(200).json(staff);
};

module.exports = {
	getAllStaffs,
	createStaff,
	updateStaff,
	deleteStaff,
};
