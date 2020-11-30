const express = require('express');
const connectDB = require('./config/db');

// createing the server
const app = express();

// connect to database
connectDB();

const PORT = process.env.PORT || 4000;

// import routes
app.use('/api/users', require('./routes/users'));

// deploy app
app.listen(PORT, () => {
    console.log(`server works in port ${PORT}`)
})