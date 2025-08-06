const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long'],
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be greater than 0'],
        max: [999999.99, 'Price cannot exceed 999,999.99'],
        validate: {
            validator: function(price) {
                return /^\d+(\.\d{1,2})?$/.test(price.toString());
            },
            message: 'Price can have at most 2 decimal places'
        }
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Food', 'Other'],
            message: 'Category must be one of: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other'
        }
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
        minlength: [1, 'Brand must be at least 1 character long'],
        maxlength: [50, 'Brand cannot exceed 50 characters']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Stock must be a whole number'
        }
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        trim: true,
        uppercase: true,
        validate: {
            validator: function(sku) {
                return /^[A-Z]{3}\d{4}$/.test(sku);
            },
            message: 'SKU must be in format: 3 letters + 4 numbers (e.g., ABC1234)'
        }
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
        min: [0.01, 'Weight must be greater than 0'],
        max: [1000, 'Weight cannot exceed 1000 kg']
    },
    dimensions: {
        length: {
            type: Number,
            required: [true, 'Length is required'],
            min: [0.1, 'Length must be at least 0.1 cm']
        },
        width: {
            type: Number,
            required: [true, 'Width is required'],
            min: [0.1, 'Width must be at least 0.1 cm']
        },
        height: {
            type: Number,
            required: [true, 'Height is required'],
            min: [0.1, 'Height must be at least 0.1 cm']
        }
    },
    releaseDate: {
        type: Date,
        required: [true, 'Release date is required'],
        validate: {
            validator: function(date) {
                const oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                return date <= oneYearFromNow;
            },
            message: 'Release date cannot be more than 1 year in the future'
        }
    },
    discontinueDate: {
        type: Date,
        validate: {
            validator: function(date) {
                return !date || date > this.releaseDate;
            },
            message: 'Discontinue date must be after release date'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: [30, 'Each tag cannot exceed 30 characters']
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required']
    }
}, {
    timestamps: true
});

productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdBy: 1 });

productSchema.virtual('volume').get(function() {
    return this.dimensions.length * this.dimensions.width * this.dimensions.height;
});

productSchema.virtual('isAvailable').get(function() {
    return this.isActive && this.stock > 0 && (!this.discontinueDate || this.discontinueDate > new Date());
});

module.exports = mongoose.model('Product', productSchema);
