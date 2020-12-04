const express = require('express');
const connectDB = require('./config/db');

// createing the server
const app = express();

// connect to database
connectDB();

// enable express.json
app.use(express.json({ extended: true}));

const PORT = process.env.PORT || 4000;

// import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// deploy app
app.listen(PORT, () => {
    console.log(`server works in port ${PORT}`)
})