
const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandler = require('./errorHandler');

// Middleware
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
