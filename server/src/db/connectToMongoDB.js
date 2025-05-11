const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        logger.info('Database connected successfully!')
    } catch(err) {
        return logger.error('MongoDB error', err)
    }
}

module.exports = connectToMongoDB