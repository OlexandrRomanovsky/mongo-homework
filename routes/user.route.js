const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// api/user
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/:userId', userController.getUser)
router.get('/:userId/articles', userController.getUserArticles)

module.exports = router;