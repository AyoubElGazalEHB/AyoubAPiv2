const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [50, 'First name cannot exceed 50 characters'],
        validate: {
            validator: function(value) {
                return /^[a-zA-ZÀ-ÿ\s]+$/.test(value);
            },
            message: 'First name can only contain letters and spaces'
        }
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [50, 'Last name cannot exceed 50 characters'],
        validate: {
            validator: function(value) {
                return /^[a-zA-ZÀ-ÿ\s]+$/.test(value);
            },
            message: 'Last name can only contain letters and spaces'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(phone) {
                return /^\+32\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(phone);
            },
            message: 'Phone number must be in format: +32 XXX XX XX XX'
        }
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function(date) {
                const today = new Date();
                const minAge = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
                return date <= minAge;
            },
            message: 'User must be at least 13 years old'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { 
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', userSchema);
