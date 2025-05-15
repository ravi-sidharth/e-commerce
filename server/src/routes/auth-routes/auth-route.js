const express = require('express')
const { userRegister, userLogin,userLogout, authMiddleware } = require('../../controllers/auth/auth-controller')

const router = express.Router()

router.post('/register',userRegister)
router.post('/login',userLogin)
router.post('/logout',userLogout)
router.get('/check-auth',authMiddleware ,(req,res)=> {
    const user = req.user 
    res.status(200).json({
        success:true,
        message:'Authenticated User!',
        user
    })
})


module.exports = router