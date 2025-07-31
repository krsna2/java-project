const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');  // 👈 add this

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
require('./db/db');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);  // 👈 mount here

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
