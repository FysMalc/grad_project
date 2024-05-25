const express = require('express');
const staffRouter = require('../controllers/staffController');
const router = express.Router();

router.get('/getAll', staffRouter.getAllStaffs);

router.post('/create', staffRouter.createStaff);

router.patch('/update', staffRouter.updateStaff);

router.delete('/delete', staffRouter.deleteStaff);

module.exports = router;
