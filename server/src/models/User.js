const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName :{
        type:String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required:true 
    },
    password: {
        type:String,
        required:true
    },
    role :{
        type: String,
        default : 'user'
    }
})


userSchema.pre("save",async function(next) {
    try {
        if (this.isModified("password")) {
            this.password =await bcrypt.hash(this.password,10)
        }
        next()
    } catch(err) {
        return next(err)
    }
})

userSchema.methods.comparePassword = async function(userPassword) {
    try {
        return await bcrypt.compare(userPassword,this.password)
    } catch(err) {
        throw err
    }
}

const User = mongoose.model('User',userSchema)

module.exports = User