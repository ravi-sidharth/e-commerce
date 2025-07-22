const jwt = require('jsonwebtoken')


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

module.exports = { authMiddleware }