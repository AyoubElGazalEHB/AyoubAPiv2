const express = require('express');
const router = express.Router();
const { validateUser } = require('../middleware/validation');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
} = require('../controllers/userController');

router.get('/search', searchUsers);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
