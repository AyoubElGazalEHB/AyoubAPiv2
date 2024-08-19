const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Default route
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

// Sample route
app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Ayoub');
});

// Get all products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get a specific product by ID
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Create a new product
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// Update a product by ID
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with ID ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Delete a product by ID
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://ayoubelgazal:nqMZzPCPsCXF@ayoubapi.i2xrj6f.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(8000, () => {
            console.log('Node API app is running on port 8000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
