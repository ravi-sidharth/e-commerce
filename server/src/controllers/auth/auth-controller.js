const User = require("../../models/User");
const logger = require('../../utils/logger')
const jwt = require('jsonwebtoken')

// register 
const userRegister = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.json({
                success: false,
                message: 'All fields are required'
            });
        }

        const user = await User.findOne({ email })
        if (user) {
            logger.warn('User is already exist with the same email! Please try again.')
            return res.json({
                success: false,
                message: 'User is already exist with the same email! Please try again.'
            })
        }

        const newlycreatedUser = new User({
            userName,
            email,
            password
        })
        await newlycreatedUser.save()

        logger.info('User register successfully!')
        res.status(201).json({
            success: true,
            message: 'User register successfully!'
        })

    } catch (err) {
        logger.error('Error occured while user registration', err)
        res.status(500).json({
            success: false,
            message: 'Error occured while user registration'
        })
    }
}

// login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: 'Email and password are required'
            });
        }


        const user = await User.findOne({ email })
        if (!user) {
            logger.warn(`User doesn't exists! Please register first`)
            return res.json({
                success: false,
                message: `User doesn't exists! Please register first`
            })
        }

        const isMatchPassword = await user.comparePassword(password)

        if (!isMatchPassword) {
            logger.warn('Incorrect password! Please try again.')
            return res.json({
                success: false,
                message: 'Incorrect password! Please try again.'
            })
        }

        const payload = {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60m' })

        logger.info('User logged in successfully!')
        // res.cookie('token',token ,{httpOnly:true, secure:true}).status(200).json({
        //     success: true,
        //     message: 'User logged in successfully!',
        //     user : {
        //         id:user._id,
        //         userName:user.userName,
        //         email:user.email,
        //         role:user.role
        //     }
        // })

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            }

        })

    } catch (err) {
        logger.error('Error occured while user login', err)
        res.status(500).json({
            success: false,
            message: 'Error occured while user login'
        })
    }
}

// logout 

const userLogout = async (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully!'
    })
}

// auth middleware 

// const authMiddleware = async (req, res, next) => {
//     const token = req.cookies.token
//     if (!token) {
//         logger.warn('You are not login, Please login to continue!')
//         return res.status(401).json({
//             success: false,
//             message: 'Unauthorised user!'
//         })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.user = decoded
//         next()
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err?.message
//         })
//     }
// }


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        logger.warn('You are not login, Please login to continue!')
        return res.status(401).json({
            success: false,
            message: 'Unauthorised user!'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err?.message
        })
    }
}


module.exports = {
    userRegister,
    userLogin,
    userLogout,
    authMiddleware
}