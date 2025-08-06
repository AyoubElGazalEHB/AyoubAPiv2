const validator = require('validator');
const handleValidationError = (res, errors) => {
    return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
    });
};
const validateUser = (req, res, next) => {
    const errors = [];
    const { firstName, lastName, email, password, phone, dateOfBirth } = req.body;

    // First name validation
    if (!firstName || firstName.trim().length === 0) {
        errors.push({ field: 'firstName', message: 'First name is required' });
    } else if (firstName.trim().length < 2) {
        errors.push({ field: 'firstName', message: 'First name must be at least 2 characters long' });
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(firstName.trim())) {
        errors.push({ field: 'firstName', message: 'First name can only contain letters and spaces' });
    }

    // Last name validation
    if (!lastName || lastName.trim().length === 0) {
        errors.push({ field: 'lastName', message: 'Last name is required' });
    } else if (lastName.trim().length < 2) {
        errors.push({ field: 'lastName', message: 'Last name must be at least 2 characters long' });
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(lastName.trim())) {
        errors.push({ field: 'lastName', message: 'Last name can only contain letters and spaces' });
    }

    // Email validation
    if (!email || email.trim().length === 0) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (!validator.isEmail(email)) {
        errors.push({ field: 'email', message: 'Please provide a valid email address' });
    }


    if (req.method === 'POST' || (req.method === 'PUT' && password)) {
        if (!password || password.length === 0) {
            errors.push({ field: 'password', message: 'Password is required' });
        } else if (password.length < 8) {
            errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' });
        }
    }

    // Phone validation
    if (!phone || phone.trim().length === 0) {
        errors.push({ field: 'phone', message: 'Phone number is required' });
    } else if (!/^\+32\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(phone.trim())) {
        errors.push({ field: 'phone', message: 'Phone number must be in format: +32 XXX XX XX XX' });
    }

    // Date of birth validation
    if (!dateOfBirth) {
        errors.push({ field: 'dateOfBirth', message: 'Date of birth is required' });
    } else {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const minAge = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
        
        if (isNaN(birthDate.getTime())) {
            errors.push({ field: 'dateOfBirth', message: 'Please provide a valid date' });
        } else if (birthDate > minAge) {
            errors.push({ field: 'dateOfBirth', message: 'User must be at least 13 years old' });
        }
    }

    if (errors.length > 0) {
        return handleValidationError(res, errors);
    }

    next();
};


const validateProduct = (req, res, next) => {
    const errors = [];
    const { name, description, price, category, brand, stock, sku, weight, dimensions, releaseDate, discontinueDate } = req.body;

    // Name validation
    if (!name || name.trim().length === 0) {
        errors.push({ field: 'name', message: 'Product name is required' });
    } else if (name.trim().length < 2 || name.trim().length > 100) {
        errors.push({ field: 'name', message: 'Product name must be between 2 and 100 characters' });
    }

    // Description validation
    if (!description || description.trim().length === 0) {
        errors.push({ field: 'description', message: 'Product description is required' });
    } else if (description.trim().length < 10 || description.trim().length > 1000) {
        errors.push({ field: 'description', message: 'Description must be between 10 and 1000 characters' });
    }

    // Price validation
    if (price === undefined || price === null) {
        errors.push({ field: 'price', message: 'Price is required' });
    } else if (isNaN(price) || price <= 0) {
        errors.push({ field: 'price', message: 'Price must be a positive number' });
    } else if (price > 999999.99) {
        errors.push({ field: 'price', message: 'Price cannot exceed 999,999.99' });
    }

    // Category validation
    const validCategories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Food', 'Other'];
    if (!category || category.trim().length === 0) {
        errors.push({ field: 'category', message: 'Category is required' });
    } else if (!validCategories.includes(category)) {
        errors.push({ field: 'category', message: `Category must be one of: ${validCategories.join(', ')}` });
    }

    // SKU validation
    if (!sku || sku.trim().length === 0) {
        errors.push({ field: 'sku', message: 'SKU is required' });
    } else if (!/^[A-Z]{3}\d{4}$/.test(sku.trim().toUpperCase())) {
        errors.push({ field: 'sku', message: 'SKU must be in format: 3 letters + 4 numbers (e.g., ABC1234)' });
    }

    // Stock validation
    if (stock === undefined || stock === null) {
        errors.push({ field: 'stock', message: 'Stock quantity is required' });
    } else if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
        errors.push({ field: 'stock', message: 'Stock must be a non-negative whole number' });
    }

    // Weight validation
    if (weight === undefined || weight === null) {
        errors.push({ field: 'weight', message: 'Weight is required' });
    } else if (isNaN(weight) || weight <= 0 || weight > 1000) {
        errors.push({ field: 'weight', message: 'Weight must be between 0.01 and 1000 kg' });
    }

    // Dimensions validation
    if (!dimensions || typeof dimensions !== 'object') {
        errors.push({ field: 'dimensions', message: 'Dimensions are required' });
    } else {
        ['length', 'width', 'height'].forEach(dim => {
            if (!dimensions[dim] || isNaN(dimensions[dim]) || dimensions[dim] < 0.1) {
                errors.push({ field: `dimensions.${dim}`, message: `${dim.charAt(0).toUpperCase() + dim.slice(1)} must be at least 0.1 cm` });
            }
        });
    }

    // Release date validation
    if (!releaseDate) {
        errors.push({ field: 'releaseDate', message: 'Release date is required' });
    } else {
        const release = new Date(releaseDate);
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        
        if (isNaN(release.getTime())) {
            errors.push({ field: 'releaseDate', message: 'Please provide a valid release date' });
        } else if (release > oneYearFromNow) {
            errors.push({ field: 'releaseDate', message: 'Release date cannot be more than 1 year in the future' });
        }
    }

    // Discontinue date validation
    if (discontinueDate) {
        const discontinue = new Date(discontinueDate);
        const release = new Date(releaseDate);
        
        if (isNaN(discontinue.getTime())) {
            errors.push({ field: 'discontinueDate', message: 'Please provide a valid discontinue date' });
        } else if (discontinue <= release) {
            errors.push({ field: 'discontinueDate', message: 'Discontinue date must be after release date' });
        }
    }

    if (errors.length > 0) {
        return handleValidationError(res, errors);
    }

    next();
};

module.exports = {
    validateUser,
    validateProduct
};
