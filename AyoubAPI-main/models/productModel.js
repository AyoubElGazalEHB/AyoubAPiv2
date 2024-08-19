const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = mongoose.Schema(
    {
        // Product name field
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        // Quantity field with default value of 0
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        // Price field
        price: {
            type: Number,
            required: true,
        },
        // Image URL field (optional)
        image: {
            type: String,
            required: false,
        }
    },
    {
        // Enable automatic timestamps for createdAt and updatedAt
        timestamps: true
    }
);

// Create a Product model using the defined schema
const Product = mongoose.model('Product', productSchema);

// Export the Product model for use in other files
module.exports = Product;
