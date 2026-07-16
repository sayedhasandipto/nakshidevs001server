require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to GovService BD Backend API');
});

// Example CRUD Route for Services
app.get('/api/services', async (req, res) => {
    // In a real app, you would fetch this from the database
    res.json({ message: 'Services endpoint', data: [] });
});

// For Vercel Serverless Functions, we need to export the Express app
module.exports = app;

// Only start the server locally if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}