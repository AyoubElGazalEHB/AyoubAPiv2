
const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');
const validateInput = require('./validateInput');
const db = require('./db'); // Assuming you have a database module

// Example protected route
router.post('/protected-route', authMiddleware, validateInput, (req, res) => {
    // Your protected route logic here
    res.send('This is a protected route');
});

// Advanced Search Route
router.get('/search', (req, res) => {
    const { query, sortBy, order } = req.query;
    db.find({ $text: { $search: query } })
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .limit(10)
      .exec((err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
      });
});

module.exports = router;
