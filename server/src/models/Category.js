const moongose = require('mongoose');

const categorySchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: true,
    }
},{timestamps:true});

module.exports=moongose.model('Category',categorySchema);

