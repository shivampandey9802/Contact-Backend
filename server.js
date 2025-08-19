const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require('dotenv').config()

connectDb()

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
// Health check endpoint for deployment monitoring
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
})

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

// Bind to 0.0.0.0 for container deployment
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`Health check available at: http://localhost:${port}/health`)
})