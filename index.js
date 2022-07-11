const express = require('express');
const dbConnection = require('./db/config');
const cors = require('cors');
require('dotenv').config();


// Express server instance
const app = express();

// Database connection
dbConnection();

// CORS
app.use(cors());

// Middlewares
app.use(express.static('public'));
app.use(express.json())
app.use('/api/auth', require('./routes/auth.route'));

// Server execution
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${ process.env.PORT }`);
});