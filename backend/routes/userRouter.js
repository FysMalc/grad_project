const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', userController.loginUser);

router.post('/signup', userController.signupUser);

router.post('/log-out', userController.logoutUser);

router.put('/update-user/:id', authUserMiddleWare, userController.updateUser);

router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser);

router.get('/getAll', authMiddleWare, userController.getAllUser);

module.exports = router;
