const express = require('express');
const router = express.Router();
const { validateProduct } = require('../middleware/validation');
const { authMiddleware, optionalAuth } = require('../authMiddleware');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory
} = require('../controllers/productController');

router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, validateProduct, createProduct);
router.put('/:id', authMiddleware, validateProduct, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
