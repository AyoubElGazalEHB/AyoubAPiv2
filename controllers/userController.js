const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const { limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' } = req.query;
        
        const users = await User.find()
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(parseInt(limit))
            .skip(parseInt(offset))
            .select('-password');

        const total = await User.countDocuments();

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: parseInt(offset) + parseInt(limit) < total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userResponse
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { q, firstName, lastName, email, limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' } = req.query;

        let query = {};

        if (q) {
            query.$or = [
                { firstName: { $regex: q, $options: 'i' } },
                { lastName: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } }
            ];
        }

        if (firstName) {
            query.firstName = { $regex: firstName, $options: 'i' };
        }

        if (lastName) {
            query.lastName = { $regex: lastName, $options: 'i' };
        }

        if (email) {
            query.email = { $regex: email, $options: 'i' };
        }

        const users = await User.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(parseInt(limit))
            .skip(parseInt(offset))
            .select('-password');

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: parseInt(offset) + parseInt(limit) < total
            },
            searchQuery: { q, firstName, lastName, email }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching users',
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
};
