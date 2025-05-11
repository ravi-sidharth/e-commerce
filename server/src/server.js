require('dotenv').config()
const express = require('express')
const {corsConfig} = require('./config/corsConfig')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const connectToMongoDB = require('./db/connectToMongoDB')
const logger = require('./utils/logger')

const app = express()
const PORT = process.env.PORT || 3000 

connectToMongoDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(corsConfig())
app.use(helmet())


app.listen(PORT,()=> logger.info(`server is running on port ${PORT}`))

