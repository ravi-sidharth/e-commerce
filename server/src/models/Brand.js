const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Brand", brandSchema);
