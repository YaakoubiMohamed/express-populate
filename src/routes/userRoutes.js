const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth')

const userController = require('../controllers/userController');


router.get('', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', verifyToken, userController.updateUser);

router.delete('/:id', verifyToken, userController.deleteUser);

