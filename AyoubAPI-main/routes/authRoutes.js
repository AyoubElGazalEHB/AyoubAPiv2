const express = require('express');
const router = express.Router();
const { validateUser } = require('../middleware/validation');
const { authMiddleware } = require('../authMiddleware');
const {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    deactivateAccount
} = require('../controllers/authController');

router.post('/register', validateUser, register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);
router.delete('/deactivate', authMiddleware, deactivateAccount);

module.exports = router;
