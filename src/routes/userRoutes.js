const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('', userController.createUser);
router.post('', userController.login);

router.get('', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('logout', userController.logout)