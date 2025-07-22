require('dotenv').config()
const express = require('express')
const {corsConfig} = require('./config/corsConfig')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const connectToMongoDB = require('./db/connectToMongoDB')
const logger = require('./utils/logger')

const authRouter = require('./routes/auth-routes/auth-route')

const adminProductsRouter = require('./routes/admin/products-routes')
const adminCategoryRouter = require("./routes/admin/category-route.js");
const adminBrandRouter = require("./routes/admin/brand-route.js");
const adminSubCategoryRouter  = require("./routes/admin/subcategory-route.js");
const adminOrderRouter = require('./routes/admin/order-route')

const shopProductsRouter = require('./routes/shop/products-route')
const shopCartRouter = require('./routes/shop/cart-route')
const shopAddressRouter = require('./routes/shop/address-route')
const shopOrderRouter = require('./routes/shop/order-route')
const shopSearchRouter = require('./routes/shop/search-route')
const shopWishlistRouter  = require("./routes/shop/wishlist-route.js");
const shopReviewRouter = require('./routes/shop/review-route')

const commonFeatureRouter = require('./routes/common/feature-routes')


const app = express()
const PORT = process.env.PORT || 3000 

connectToMongoDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(corsConfig())
app.use(helmet())

app.use('/api/auth',authRouter)

app.use('/api/admin/product',adminProductsRouter)
app.use("/api/admin/category", adminCategoryRouter);
app.use("/api/admin/brand", adminBrandRouter);
app.use("/api/admin/subcategory", adminSubCategoryRouter);
app.use('/api/admin/order', adminOrderRouter)

app.use('/api/shopping/product',shopProductsRouter)
app.use('/api/shopping/cart',shopCartRouter)
app.use('/api/shopping/address',shopAddressRouter)
app.use('/api/shopping/order',shopOrderRouter)
app.use('/api/shopping/search',shopSearchRouter)
app.use('/api/shopping/review',shopReviewRouter)
app.use("/api/shopping/wishlist", shopWishlistRouter);

app.use('/api/common/feature',commonFeatureRouter)


app.listen(PORT,()=> logger.info(`server is running on port ${PORT}`))

