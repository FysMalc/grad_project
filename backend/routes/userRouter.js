const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', userController.loginUser);

router.post('/signup', authMiddleWare, userController.signupUser);

router.post('/log-out', userController.logoutUser);

router.put('/update-user/:id', authMiddleWare, userController.updateUser);

router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser);

router.get('/getAll', userController.getAllUser);

module.exports = router;
