require('dotenv').config()
const express = require('express')
const {corsConfig} = require('./config/corsConfig')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const connectToMongoDB = require('./db/connectToMongoDB')
const logger = require('./utils/logger')
const authRouter = require('./routes/auth-routes/auth-route')
const adminProductsRouter = require('./routes/admin/products-routes')
const adminOrderRouter = require('./routes/admin/order-route')

const shopProductsRouter = require('./routes/shop/products-route')
const shopCartRouter = require('./routes/shop/cart-route')
const shopAddressRouter = require('./routes/shop/address-route')
const shopOrderRouter = require('./routes/shop/order-route')
const shopSearchRouter = require('./routes/shop/search-route')

const app = express()
const PORT = process.env.PORT || 3000 

connectToMongoDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(corsConfig())
app.use(helmet())

app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductsRouter)
app.use('/api/admin/orders', adminOrderRouter)

app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use('/api/shop/search',shopSearchRouter)

app.listen(PORT,()=> logger.info(`server is running on port ${PORT}`))

