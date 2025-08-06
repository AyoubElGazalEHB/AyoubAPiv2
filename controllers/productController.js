const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const { limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' } = req.query;
        
        const products = await Product.find()
            .populate('createdBy', 'firstName lastName email')
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(parseInt(limit))
            .skip(parseInt(offset));

        const total = await Product.countDocuments();

        res.status(200).json({
            success: true,
            data: products,
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
            message: 'Error fetching products',
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy', 'firstName lastName email');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            createdBy: req.user ? req.user.id : req.body.createdBy
        };

        const product = new Product(productData);
        await product.save();

        const populatedProduct = await Product.findById(product._id)
            .populate('createdBy', 'firstName lastName email');

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: populatedProduct
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
                message: 'SKU already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('createdBy', 'firstName lastName email');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
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
                message: 'Invalid product ID format'
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'SKU already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

const searchProducts = async (req, res) => {
    try {
        const { 
            q, name, category, brand, minPrice, maxPrice, 
            limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' 
        } = req.query;

        let query = {};

        if (q) {
            query.$or = [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { brand: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ];
        }

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (brand) {
            query.brand = { $regex: brand, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        const products = await Product.find(query)
            .populate('createdBy', 'firstName lastName email')
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(parseInt(limit))
            .skip(parseInt(offset));

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: parseInt(offset) + parseInt(limit) < total
            },
            searchQuery: { q, name, category, brand, minPrice, maxPrice }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching products',
            error: error.message
        });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 10, offset = 0, sortBy = 'createdAt', order = 'desc' } = req.query;

        const products = await Product.find({ category })
            .populate('createdBy', 'firstName lastName email')
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(parseInt(limit))
            .skip(parseInt(offset));

        const total = await Product.countDocuments({ category });

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: parseInt(offset) + parseInt(limit) < total
            },
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products by category',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory
};
