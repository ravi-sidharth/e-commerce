const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: String,
    address: String,
    city: String,
    pincode: Number,
    phone: Number,
    notes: String,
}, { timestamps: true })

module.exports = mongoose.model('Address', addressSchema)