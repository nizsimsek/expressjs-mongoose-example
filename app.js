const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv/config')

// IMPORT ROUTES
const postRoute = require('./routes/posts')

// MIDDLEWARE
app.use(cors())
app.use(express.json());
app.use('/posts', postRoute)

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home')
})

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to DB!')
})

// HOW TO WE START LISTENING TO SERVER
app.listen(3000);