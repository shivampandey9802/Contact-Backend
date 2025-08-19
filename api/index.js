const express = require('express')
const errorHandler = require('../middleware/errorHandler')
const connectDb = require('../config/dbConnection')
const dotenv = require('dotenv').config()

// Initialize database connection
connectDb()

const app = express()

// Middleware
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
})

// API Routes
app.use("/api/contacts", require("../routes/contactRoutes"))
app.use("/api/users", require("../routes/userRoutes"))

// Error handler
app.use(errorHandler)

// Handle root path
app.get('/', (req, res) => {
    res.json({
        message: 'Contact Management API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            contacts: '/api/contacts',
            users: '/api/users'
        }
    })
})

// Export the Express app for Vercel
module.exports = app